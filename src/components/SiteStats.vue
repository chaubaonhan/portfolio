<script setup lang="ts">
import gsap from "gsap";
import { reactive, ref, watch, type Ref } from "vue";
import { useSiteStats } from "../composables/useSiteStats";

const { views, liveViewers, hearts, hasHearted, sendHeart } = useSiteStats();

const formatter = new Intl.NumberFormat("en");
const shown = reactive({ views: 0, live: 0, hearts: 0 });

// Count up to each new value instead of jumping.
const tweenTo = (source: Ref<number | null>, key: keyof typeof shown) => {
  watch(source, (value) => {
    if (value === null) return;
    gsap.to(shown, {
      [key]: value,
      duration: Math.abs(value - shown[key]) > 5 ? 1.2 : 0.4,
      ease: "power2.out",
      roundProps: key,
    });
  });
};

tweenTo(views, "views");
tweenTo(liveViewers, "live");
tweenTo(hearts, "hearts");

const isPopping = ref(false);
const bursts = ref<{ id: number; x: number; delay: number; scale: number }[]>([]);
let burstId = 0;

const handleHeart = async () => {
  isPopping.value = false;
  requestAnimationFrame(() => (isPopping.value = true));

  const count = hasHearted.value ? 3 : 8;
  const created = Array.from({ length: count }, () => ({
    id: ++burstId,
    x: Math.round((Math.random() - 0.5) * 70),
    delay: Math.round(Math.random() * 180),
    scale: 0.6 + Math.random() * 0.7,
  }));
  bursts.value.push(...created);
  window.setTimeout(() => {
    const ids = new Set(created.map((burst) => burst.id));
    bursts.value = bursts.value.filter((burst) => !ids.has(burst.id));
  }, 1400);

  await sendHeart();
};
</script>

<template>
  <div class="site-stats" role="group" aria-label="Site activity">
    <span class="site-stats-item" :title="'Total visits'">
      <svg class="site-stats-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span class="site-stats-value">{{ views === null ? "—" : formatter.format(shown.views) }}</span>
      <span class="site-stats-label">views</span>
      <span class="sr-only">total visits</span>
    </span>

    <span class="site-stats-divider" aria-hidden="true"></span>

    <span class="site-stats-item" :title="'People viewing in the last few minutes'" aria-live="polite">
      <span class="site-stats-live-dot" aria-hidden="true"></span>
      <span class="site-stats-value">{{ liveViewers === null ? "—" : formatter.format(shown.live) }}</span>
      <span class="site-stats-label">live</span>
      <span class="sr-only">people viewing now</span>
    </span>

    <span class="site-stats-divider" aria-hidden="true"></span>

    <button
      type="button"
      :class="['site-stats-heart', { 'site-stats-heart-active': hasHearted, 'site-stats-heart-pop': isPopping }]"
      :aria-pressed="hasHearted"
      :aria-label="hasHearted ? `You sent a heart. ${hearts ?? 0} hearts` : `Send a heart. ${hearts ?? 0} hearts`"
      :title="hasHearted ? 'Thanks for the heart!' : 'Send a heart'"
      data-sound="click"
      data-hoversound="hover"
      @click="handleHeart"
      @animationend="isPopping = false"
    >
      <svg class="site-stats-icon site-stats-heart-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 20.5s-7.5-4.6-9.4-9.3C1.3 8 3.3 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3.1 1.6-1.9 3.1-3.1 5.2-3.1 3.5 0 5.5 3.5 4.2 6.7-1.9 4.7-9.4 9.3-9.4 9.3Z"
        />
      </svg>
      <span class="site-stats-value">{{ hearts === null ? "—" : formatter.format(shown.hearts) }}</span>

      <span
        v-for="burst in bursts"
        :key="burst.id"
        class="site-stats-burst"
        :style="{ '--burst-x': `${burst.x}px`, '--burst-scale': burst.scale, animationDelay: `${burst.delay}ms` }"
        aria-hidden="true"
        >♥</span
      >
    </button>
  </div>
</template>

<style scoped lang="scss">
.site-stats {
  position: fixed;
  left: var(--space-outer);
  bottom: var(--space-outer);
  z-index: var(--z-index-header-home);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px 6px 14px;
  border: var(--stroke-md) solid var(--color-black-400);
  border-radius: 100px;
  background: var(--color-beige-400);
  box-shadow: 0 6px 0 rgba(45, 42, 36, 0.12);
  color: var(--color-text-400);
  font-family: "ProFontWindows";
  font-size: var(--font-size-sm);
  letter-spacing: 0.04em;

  &-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  &-icon {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linejoin: round;
  }

  &-value {
    min-width: 1ch;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  &-label {
    display: none;
    color: var(--color-text-300);
    text-transform: uppercase;

    @include mixins.mq("md") {
      display: inline;
    }
  }

  &-divider {
    width: 2px;
    height: 16px;
    background: currentColor;
    opacity: 0.2;
  }

  &-live-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2fbf71;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #2fbf71;
      animation: site-stats-ping 1.8s ease-out infinite;
    }
  }

  &-heart {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: var(--stroke-md) solid var(--color-black-400);
    border-radius: 100px;
    background: var(--color-white-400);
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition:
      background-color 0.2s ease-in-out,
      transform 0.2s var(--ease-smooth);

    @include mixins.hover {
      &:hover {
        transform: translateY(-2px);
      }
    }

    &-icon {
      color: #e0245e;
      transition: fill 0.2s ease-in-out;
    }

    &-active {
      background: #ffe3ec;

      .site-stats-heart-icon {
        fill: #e0245e;
      }
    }

    &-pop .site-stats-heart-icon {
      animation: site-stats-pop 0.45s var(--ease-smooth);
    }
  }

  &-burst {
    position: absolute;
    left: 18px;
    bottom: 60%;
    color: #e0245e;
    font-size: 16px;
    pointer-events: none;
    opacity: 0;
    animation: site-stats-burst 1.1s ease-out forwards;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@keyframes site-stats-ping {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

@keyframes site-stats-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.45);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes site-stats-burst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(var(--burst-scale));
  }
  100% {
    opacity: 0;
    transform: translate(var(--burst-x), -70px) scale(calc(var(--burst-scale) * 0.6)) rotate(20deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-stats-live-dot::after,
  .site-stats-heart-pop .site-stats-heart-icon,
  .site-stats-burst {
    animation: none;
  }
}
</style>
