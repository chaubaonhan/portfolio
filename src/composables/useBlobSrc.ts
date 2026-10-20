import { ref, toValue, watch, type MaybeRefOrGetter } from "vue";

// Media is loaded through fetch() and shown via short-lived blob: URLs, so inspecting an element
// shows no direct file path. This only makes casual saving harder: anything a browser displays can
// still be captured (Network tab, screenshots).
const cache = new Map<string, Promise<string>>();

export const toBlobUrl = (src: string): Promise<string> => {
  if (!src || src.startsWith("blob:") || src.startsWith("data:")) return Promise.resolve(src);

  let pending = cache.get(src);
  if (!pending) {
    pending = fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${src}`);
        return response.blob();
      })
      .then((blob) => URL.createObjectURL(blob))
      // Fall back to the original URL so media never disappears if fetch fails.
      .catch(() => src);
    cache.set(src, pending);
  }
  return pending;
};

export const useBlobSrc = (source: MaybeRefOrGetter<string | undefined>) => {
  const url = ref<string>();

  watch(
    () => toValue(source),
    async (src) => {
      url.value = undefined;
      if (!src) return;
      const resolved = await toBlobUrl(src);
      if (toValue(source) === src) url.value = resolved;
    },
    { immediate: true },
  );

  return url;
};
