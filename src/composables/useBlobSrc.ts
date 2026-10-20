import { ref, toValue, watch, type MaybeRefOrGetter } from "vue";

// Media from src/media/ is encrypted at build time (see vite-plugins/protected-media.ts) and its
// imports resolve to "protected:<url>#<iv>#<mime>". Here it is fetched, decrypted, and shown via a
// short-lived blob: URL, so neither the element nor the asset URL exposes a usable file. Anything a
// browser displays can still be captured (screenshots, dev tools); this only deters casual saving.
declare const __MEDIA_KEY__: string;

const PROTECTED_PREFIX = "protected:";
const cache = new Map<string, Promise<Blob | null>>();
let mediaKey: Promise<CryptoKey> | null = null;

const decodeBase64 = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
};

const getMediaKey = () =>
  (mediaKey ??= crypto.subtle.importKey("raw", decodeBase64(__MEDIA_KEY__), "AES-GCM", false, ["decrypt"]));

const fetchOk = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load media (${response.status})`);
  return response;
};

const loadProtected = async (src: string) => {
  const [url, iv, mime] = src.slice(PROTECTED_PREFIX.length).split("#") as [string, string, string];
  const encrypted = await (await fetchOk(url)).arrayBuffer();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: decodeBase64(iv) },
    await getMediaKey(),
    encrypted,
  );
  return new Blob([decrypted], { type: mime });
};

const loadPlain = async (src: string) => (await fetchOk(src)).blob();

// Every call returns a fresh blob: URL. App.vue revokes it as soon as the <img>/<video> has loaded,
// so a copied blob: link stops working while the element keeps showing the media.
export const toBlobUrl = async (src: string): Promise<string> => {
  if (!src || src.startsWith("blob:") || src.startsWith("data:")) return src;

  const isProtected = src.startsWith(PROTECTED_PREFIX);
  let pending = cache.get(src);
  if (!pending) {
    pending = (isProtected ? loadProtected(src) : loadPlain(src)).catch(() => null);
    cache.set(src, pending);
  }

  const blob = await pending;
  // A protected source is not a usable URL, so show nothing rather than a broken link.
  if (!blob) return isProtected ? "" : src;
  return URL.createObjectURL(blob);
};

export const useBlobSrc = (source: MaybeRefOrGetter<string | undefined>) => {
  const url = ref<string>();

  watch(
    () => toValue(source),
    async (src) => {
      url.value = undefined;
      if (!src) return;
      const resolved = await toBlobUrl(src);
      if (toValue(source) === src) url.value = resolved || undefined;
    },
    { immediate: true },
  );

  return url;
};
