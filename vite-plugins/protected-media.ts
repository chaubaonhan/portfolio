import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";

// Encrypts images and videos from src/media/ at build time so the deployed files are opaque .bin
// blobs: opening an asset URL directly shows nothing usable. The page decrypts them in the browser
// (see src/composables/useBlobSrc.ts) with a per-build key that has to ship in the bundle, so this
// deters casual downloading rather than providing real access control.
//
// Imports resolve to a string "protected:<url>#<iv>#<mime>" instead of a plain asset URL.
// 3D textures are left untouched because the WebGL loaders fetch them directly.

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
};

const DEV_PREFIX = "/@protected-media/";

export const protectedMedia = (): Plugin => {
  const key = randomBytes(32);
  const devFiles = new Map<string, Buffer>();
  let isBuild = false;

  const encrypt = (data: Buffer) => {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    // Web Crypto expects the GCM auth tag appended to the ciphertext.
    const body = Buffer.concat([cipher.update(data), cipher.final(), cipher.getAuthTag()]);
    return { iv: iv.toString("base64url"), body };
  };

  return {
    name: "protected-media",
    enforce: "pre",

    config() {
      return { define: { __MEDIA_KEY__: JSON.stringify(key.toString("base64")) } };
    },

    configResolved(config) {
      isBuild = config.command === "build";
    },

    load(id) {
      const [file, query] = id.split("?");
      if (query || !file) return;

      const normalized = file.replace(/\\/g, "/");
      if (!normalized.includes("/src/media/") || normalized.includes("/src/media/textures/")) return;

      const mime = MIME_TYPES[path.extname(normalized).slice(1).toLowerCase()];
      if (!mime) return;

      const { iv, body } = encrypt(readFileSync(file));
      const name = createHash("sha256").update(normalized).digest("hex").slice(0, 16);
      const suffix = JSON.stringify(`#${iv}#${mime}`);

      if (isBuild) {
        const ref = this.emitFile({ type: "asset", name: `${name}.bin`, source: body });
        return `export default "protected:" + import.meta.ROLLUP_FILE_URL_${ref} + ${suffix};`;
      }

      devFiles.set(name, body);
      return `export default "protected:${DEV_PREFIX}${name}.bin" + ${suffix};`;
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/@protected-media\/([a-f0-9]+)\.bin/);
        if (!match) return next();

        const body = devFiles.get(match[1] as string);
        if (!body) {
          res.statusCode = 404;
          res.end();
          return;
        }

        res.setHeader("Content-Type", "application/octet-stream");
        res.end(body);
      });
    },
  };
};
