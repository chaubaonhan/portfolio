import { onBeforeUnmount, onMounted, ref } from "vue";

// Free, keyless counter API: https://jasoncameron.dev/abacus
// Admin keys for resetting the counters live in the local .env file (never committed).
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "chaubaonhan-portfolio";
const VIEWS_KEY = "page-views";
const HEARTS_KEY = "hearts";

// "Viewing now" has no native support, so every open tab checks in once per time bucket
// and the live count is the number of check-ins in the current or previous bucket.
const LIVE_BUCKET_MS = 2 * 60 * 1000;
const LIVE_REFRESH_MS = 20 * 1000;
const HEARTS_POLL_MS = 30 * 1000;

// Only real visits on the deployed site change the counters; local dev just reads them.
const canWrite = import.meta.env.PROD;

const storage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Private mode or blocked storage: counting still works, it just is not deduplicated.
    }
  },
};

const request = async (action: "get" | "hit", key: string): Promise<number | null> => {
  try {
    const response = await fetch(`${API}/${action}/${NAMESPACE}/${key}`);
    if (response.status === 404) return 0;
    if (!response.ok) return null;
    const data = (await response.json()) as { value?: number };
    return typeof data.value === "number" ? data.value : null;
  } catch {
    return null;
  }
};

export const useSiteStats = () => {
  const views = ref<number | null>(null);
  const liveViewers = ref<number | null>(null);
  const hearts = ref<number | null>(null);
  const hasHearted = ref(storage.get("site-stats:hearted") === "1");

  let liveTimer = 0;
  let heartsTimer = 0;
  let heartsStream: EventSource | null = null;
  let lastLiveBucket = -1;

  // One view per browser per day, so refreshing the page does not inflate the count.
  const loadViews = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const shouldCount = canWrite && storage.get("site-stats:viewed-on") !== today;
    const value = await request(shouldCount ? "hit" : "get", VIEWS_KEY);
    if (value === null) return;
    if (shouldCount) storage.set("site-stats:viewed-on", today);
    views.value = value;
  };

  const refreshLive = async () => {
    const bucket = Math.floor(Date.now() / LIVE_BUCKET_MS);
    let current: number | null = null;

    if (canWrite && !document.hidden && bucket !== lastLiveBucket) {
      current = await request("hit", `live-${bucket}`);
      if (current !== null) lastLiveBucket = bucket;
    } else {
      current = await request("get", `live-${bucket}`);
    }

    const previous = await request("get", `live-${bucket - 1}`);
    if (current === null && previous === null) return;

    // The visitor looking at the widget is always viewing, so never show zero.
    liveViewers.value = Math.max(current ?? 0, previous ?? 0, 1);
  };

  const pollHearts = async () => {
    const value = await request("get", HEARTS_KEY);
    if (value !== null) hearts.value = value;
  };

  // Live updates when someone else sends a heart; falls back to polling if the stream drops.
  const watchHearts = () => {
    if (typeof EventSource === "undefined") {
      heartsTimer = window.setInterval(pollHearts, HEARTS_POLL_MS);
      return;
    }

    heartsStream = new EventSource(`${API}/stream/${NAMESPACE}/${HEARTS_KEY}`);
    heartsStream.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { value?: number };
        if (typeof data.value === "number") hearts.value = data.value;
      } catch {
        // Ignore malformed events.
      }
    };
    heartsStream.onerror = () => {
      heartsStream?.close();
      heartsStream = null;
      if (!heartsTimer) heartsTimer = window.setInterval(pollHearts, HEARTS_POLL_MS);
    };
  };

  const sendHeart = async () => {
    if (hasHearted.value) return false;

    hasHearted.value = true;
    storage.set("site-stats:hearted", "1");
    hearts.value = (hearts.value ?? 0) + 1;

    if (!canWrite) return true;

    const value = await request("hit", HEARTS_KEY);
    if (value !== null) hearts.value = value;
    return true;
  };

  const handleVisibility = () => {
    if (!document.hidden) refreshLive();
  };

  onMounted(() => {
    loadViews();
    pollHearts();
    watchHearts();
    refreshLive();
    liveTimer = window.setInterval(refreshLive, LIVE_REFRESH_MS);
    document.addEventListener("visibilitychange", handleVisibility);
  });

  onBeforeUnmount(() => {
    window.clearInterval(liveTimer);
    window.clearInterval(heartsTimer);
    heartsStream?.close();
    document.removeEventListener("visibilitychange", handleVisibility);
  });

  return { views, liveViewers, hearts, hasHearted, sendHeart };
};
