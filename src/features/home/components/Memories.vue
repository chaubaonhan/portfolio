<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Banner from "../../../components/Banner.vue";
import ButtonRound from "../../../components/ButtonRound.vue";
import NotchSection from "../../../components/NotchSection.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import { useCenteredCarousel } from "../../../composables/useCenteredCarousel";
import { memories as allMemories } from "../../../content/memories";

const imageModules = import.meta.glob<string>("../../../assets/memories/*.{jpg,jpeg,png,webp,mp4,webm}", {
  eager: true,
  import: "default",
});

const imageUrls = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split("/").pop() as string, url]),
);

// Skip entries whose media file is not available (e.g. a clone without access to the private media repo).
const memories = allMemories.filter((memory) => memory.image in imageUrls);

const memoryCount = computed(() => memories.length);
const { trackRef, activeIndex, previous, next, handleKeydown, focusInactiveItem } = useCenteredCarousel(memoryCount);

const flippedIndex = ref<number | null>(null);

const toggleFlip = (index: number) => {
  flippedIndex.value = flippedIndex.value === index ? null : index;
};

// Turn a card back to its photo once it leaves the center.
watch(activeIndex, (index) => {
  if (flippedIndex.value !== index) flippedIndex.value = null;
});

const isVideo = (file: string) => /\.(mp4|webm)$/i.test(file);

const paragraphs = (story: string) => story.split(/\n\s*\n/);
</script>

<template>
  <section v-if="memories.length" class="memories">
    <NotchSection class="memories-notch-end" />

    <div class="grid memories-heading-grid">
      <div class="memories-heading">
        <Banner class="memories-heading-banner" copy="Personal" size="sm" animated />
        <h2 class="memories-heading-title">Memories</h2>
        <p class="memories-heading-copy">
          Moments from my studies and academic journey. Tap a photo to read the story behind it.
        </p>
      </div>
    </div>

    <div class="memories-carousel">
      <div
        ref="trackRef"
        class="memories-cards"
        role="region"
        aria-label="Memories carousel"
        tabindex="0"
        @keydown="handleKeydown"
      >
        <article
          v-for="(memory, index) in memories"
          :key="memory.image + memory.title"
          :class="[
            'memory-card',
            { 'memory-card-active': activeIndex === index, 'memory-card-flipped': flippedIndex === index },
          ]"
          @click.capture="focusInactiveItem($event, index)"
        >
          <button
            type="button"
            class="memory-card-inner"
            :aria-pressed="flippedIndex === index"
            :aria-label="`${memory.title}, ${flippedIndex === index ? 'show photo' : 'read the story'}`"
            data-sound="click"
            data-hoversound="hover"
            @click="toggleFlip(index)"
          >
            <div class="memory-card-face memory-card-front" :aria-hidden="flippedIndex === index">
              <div class="memory-card-photo">
                <video
                  v-if="isVideo(memory.image)"
                  :src="imageUrls[memory.image]"
                  :aria-label="memory.alt"
                  :style="{ objectPosition: memory.focus ?? '50% 50%' }"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                ></video>
                <img
                  v-else
                  :src="imageUrls[memory.image]"
                  :alt="memory.alt"
                  :style="{ objectPosition: memory.focus ?? '50% 50%' }"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <div class="memory-card-caption">
                <span class="memory-card-date">{{ memory.date }}</span>
                <span class="memory-card-title">{{ memory.title }}</span>
                <span class="memory-card-hint">Tap to flip ↻</span>
              </div>
            </div>

            <div class="memory-card-face memory-card-back" :aria-hidden="flippedIndex !== index">
              <div class="memory-card-back-top">
                <span class="memory-card-date">{{ memory.date }}</span>
                <span v-if="memory.place" class="memory-card-place">{{ memory.place }}</span>
              </div>
              <div class="memory-card-story">
                <h3 class="memory-card-story-title">{{ memory.title }}</h3>
                <p v-for="(paragraph, paragraphIndex) in paragraphs(memory.story)" :key="paragraphIndex">
                  {{ paragraph }}
                </p>
              </div>
              <span class="memory-card-hint">Tap to see the photo ↻</span>
            </div>
          </button>
        </article>
      </div>

      <div v-if="memoryCount > 1" class="memories-carousel-controls">
        <ButtonRound
          class="memories-carousel-button memories-carousel-button-previous"
          variant="accent"
          size="lg"
          aria-label="Previous memory"
          @click="previous"
        >
          <ArrowRight class="memories-carousel-arrow memories-carousel-arrow-previous" />
        </ButtonRound>

        <div class="memories-carousel-status" aria-live="polite">
          <span>{{ String(activeIndex + 1).padStart(2, "0") }}</span>
          <span class="memories-carousel-status-line"></span>
          <span>{{ String(memoryCount).padStart(2, "0") }}</span>
        </div>

        <ButtonRound
          class="memories-carousel-button memories-carousel-button-next"
          variant="accent"
          size="lg"
          aria-label="Next memory"
          @click="next"
        >
          <ArrowRight class="memories-carousel-arrow" />
        </ButtonRound>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.memories {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  width: 100%;
  padding: 112px var(--space-outer) 128px;
  background-color: var(--color-beige-500);
  overflow: hidden;

  @include mixins.mq("md") {
    gap: var(--space-xxl);
    padding-top: 152px;
    padding-bottom: 168px;
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &::before {
    content: "MEMORY BOX / 04";
    position: absolute;
    top: calc(var(--height-header) + 10px);
    right: var(--space-outer);
    color: var(--color-text-300);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    letter-spacing: 0.08em;
  }

  &-notch-end {
    position: absolute;
    bottom: 0;
    left: 0;
    color: var(--color-beige-400);
    --icon-color: var(--color-beige-400);
  }

  &-heading {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 10;
    }

    &-grid {
      width: 100%;
    }

    &-title {
      font-size: var(--font-size-title-md);
      font-weight: 900;
      letter-spacing: 0.02em;

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }
    }

    &-copy {
      max-width: 680px;
      color: var(--color-text-300);
      font-size: var(--font-size-lg);
      line-height: var(--line-height-copy);
    }

    &-banner {
      position: absolute;
      top: 0;
      left: -8px;
      transform: translate(0, -20%) rotate(-4deg);

      @include mixins.mq("lg") {
        left: -16px;
        transform: translate(0, -20%) rotate(-6deg);
      }
    }
  }

  &-cards {
    --carousel-card-width: min(82vw, 500px);

    display: flex;
    gap: clamp(20px, 3vw, 44px);
    width: 100%;
    padding: 24px calc((100% - var(--carousel-card-width)) / 2) 36px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-padding-inline: calc((100% - var(--carousel-card-width)) / 2);
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    touch-action: pan-x pan-y;
    mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);

    &::-webkit-scrollbar {
      display: none;
    }

    @include mixins.mq("md") {
      --carousel-card-width: min(48vw, 500px);
    }
  }

  &-carousel {
    position: relative;
    width: calc(100% + var(--space-outer) * 2);
    margin-inline: calc(var(--space-outer) * -1);

    &-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      padding-inline: var(--space-outer);

      @include mixins.mq("md") {
        display: contents;
      }
    }

    &-button {
      z-index: 3;
      flex: 0 0 auto;
      box-shadow: 0 8px 24px rgba(45, 42, 36, 0.18);

      @include mixins.mq("md") {
        position: absolute;
        top: 46%;
        transform: translateY(-50%);

        &-previous {
          left: max(var(--space-outer), 14px);
        }

        &-next {
          right: max(var(--space-outer), 14px);
        }
      }
    }

    &-arrow {
      width: 100%;

      &-previous {
        transform: rotate(180deg);
      }
    }

    &-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      color: var(--color-text-300);
      font-family: "ProFontWindows";
      font-size: var(--font-size-sm);
      letter-spacing: 0.08em;

      &-line {
        width: 48px;
        height: 2px;
        background: currentColor;
        opacity: 0.45;
      }
    }
  }
}

.memory-card {
  --card-accent: var(--color-orange-400);

  flex: 0 0 var(--carousel-card-width);
  width: var(--carousel-card-width);
  min-width: 0;
  perspective: 1600px;
  opacity: 0.24;
  filter: saturate(0.55);
  scroll-snap-align: center;
  scroll-snap-stop: always;
  transform: scale(0.9);
  transform-origin: center;
  transition:
    opacity 0.45s var(--ease-smooth),
    filter 0.45s var(--ease-smooth),
    transform 0.35s var(--ease-smooth);

  &-active {
    opacity: 1;
    filter: none;
    transform: scale(1);
  }

  &:nth-child(3n + 2) {
    --card-accent: var(--color-dark-blue-500);
  }

  &:nth-child(3n + 3) {
    --card-accent: var(--color-cyan-500);
  }

  &-inner {
    position: relative;
    display: grid;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.7s var(--ease-smooth);
  }

  &-flipped &-inner {
    transform: rotateY(180deg);
  }

  @include mixins.hover {
    &-active:not(.memory-card-flipped) .memory-card-inner:hover {
      transform: translateY(-8px) rotate(-0.6deg);
    }
  }

  &-face {
    grid-area: 1 / 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: var(--stroke-md) solid var(--color-black-400);
    border-radius: var(--radius-xl);
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &-front {
    padding: var(--space-sm) var(--space-sm) 0;
    background: var(--color-white-400);
  }

  &-photo {
    aspect-ratio: 4 / 3;
    border: var(--stroke-md) solid var(--color-black-400);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--color-beige-600);

    img,
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
    }
  }

  &-caption {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-xs) var(--space-sm);
    padding: var(--space-md) var(--space-sm);
  }

  &-date {
    color: var(--card-accent);
    font-family: "ProFontWindows";
    font-size: var(--font-size-title-xs);
    font-weight: 700;
  }

  &-title {
    flex: 1;
    font-size: var(--font-size-title-xs);
    font-weight: 900;
    line-height: var(--line-height-title);
  }

  &-hint {
    color: var(--color-text-300);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &-back {
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-lg);
    background-color: var(--color-beige-400);
    background-image:
      linear-gradient(rgba(45, 42, 36, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 42, 36, 0.06) 1px, transparent 1px);
    background-size: 18px 18px;
    transform: rotateY(180deg);

    &-top {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--space-xs) var(--space-sm);
      padding-bottom: var(--space-sm);
      border-bottom: var(--stroke-md) solid var(--color-black-400);
    }
  }

  &-place {
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &-story {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-sm);
    overflow-y: auto;

    &-title {
      font-size: var(--font-size-title-xs);
      font-weight: 900;
      line-height: var(--line-height-title);
    }

    p {
      color: var(--color-text-300);
      line-height: var(--line-height-copy);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .memory-card,
  .memory-card-inner {
    transition: none;
  }
}
</style>
