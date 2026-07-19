<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { previews } from "../../../content/projects/previews";
import { locale } from "../../../i18n/store";
import PreviewCard from "../../projects/components/PreviewCard.vue";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import ButtonRound from "../../../components/ButtonRound.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import { t } from "../../../i18n/utils/translate";
import { isFeatureEnabled } from "../../../utils/features";
import { useCenteredCarousel } from "../../../composables/useCenteredCarousel";

import type { ProjectPreview } from "../../../content/types";

const loadedPreviews = ref<ProjectPreview[] | null>(null);
const cardCount = computed(() => (loadedPreviews.value?.length ?? 0) + (isFeatureEnabled("startProject") ? 1 : 0));
const { trackRef, activeIndex, previous, next, handleKeydown, focusInactiveItem } = useCenteredCarousel(cardCount);
const currentCardNumber = computed(() => (cardCount.value ? activeIndex.value + 1 : 0));

const emit = defineEmits<{
  (e: "loaded", previews: ProjectPreview[]): void;
}>();

const loadPreviews = async () => {
  if (!locale.value) return;
  const func = previews[locale.value as keyof typeof previews];
  if (!func) return;
  const module = await func();
  loadedPreviews.value = module.default;
  emit("loaded", module.default);
};

watch(locale, loadPreviews);

onMounted(loadPreviews);
</script>

<template>
  <div class="projects">
    <NotchSection class="projects-notch-start" />
    <NotchSection class="projects-notch-end" />
    <div class="grid">
      <div class="projects-title">
        <Banner class="projects-title-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="projects-title-copy">{{ t("projects") }}</h2>
      </div>
    </div>
    <div class="projects-carousel">
      <div
        ref="trackRef"
        class="projects-cards"
        role="region"
        aria-label="Selected work carousel"
        tabindex="0"
        @keydown="handleKeydown"
      >
        <div
          v-for="(preview, index) in loadedPreviews"
          :key="preview.title"
          :class="['projects-card', { 'projects-card-active': activeIndex === index }]"
          @click.capture="focusInactiveItem($event, index)"
        >
          <PreviewCard :preview="preview" />
        </div>
        <div
          v-if="isFeatureEnabled('startProject')"
          :class="['projects-card', { 'projects-card-active': activeIndex === cardCount - 1 }]"
          @click.capture="focusInactiveItem($event, cardCount - 1)"
        >
          <PreviewCard />
        </div>
      </div>

      <div class="projects-carousel-controls">
        <ButtonRound
          class="projects-carousel-button projects-carousel-button-previous"
          variant="accent"
          size="lg"
          aria-label="Previous project"
          @click="previous"
        >
          <ArrowRight class="projects-carousel-arrow projects-carousel-arrow-previous" />
        </ButtonRound>

        <div class="projects-carousel-status" aria-live="polite">
          <span>{{ String(currentCardNumber).padStart(2, "0") }}</span>
          <span class="projects-carousel-status-line"></span>
          <span>{{ String(cardCount).padStart(2, "0") }}</span>
        </div>

        <ButtonRound
          class="projects-carousel-button projects-carousel-button-next"
          variant="accent"
          size="lg"
          aria-label="Next project"
          @click="next"
        >
          <ArrowRight class="projects-carousel-arrow" />
        </ButtonRound>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: var(--space-xl);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-beige-400);
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding-top: 96px;
  padding-bottom: 96px;

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &-title {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 8;
    }

    &-copy {
      font-weight: 900;
      letter-spacing: 0.02em;
      font-size: var(--font-size-title-md);

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }
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

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-beige-400);
      --icon-color: var(--color-beige-400);
    }

    &-end {
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--color-beige-600);
      --icon-color: var(--color-beige-600);
    }
  }

  &-cards {
    --carousel-card-width: min(82vw, 620px);

    display: flex;
    gap: clamp(20px, 3vw, 48px);
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
      --carousel-card-width: min(60vw, 620px);
    }

    @include mixins.mq("xl") {
      --carousel-card-width: min(48vw, 620px);
    }
  }

  &-card {
    flex: 0 0 var(--carousel-card-width);
    min-width: 0;
    opacity: 0.24;
    filter: saturate(0.55);
    scroll-snap-align: center;
    scroll-snap-stop: always;
    transform: scale(0.9);
    transform-origin: center;
    transition:
      opacity 0.45s var(--ease-smooth),
      filter 0.45s var(--ease-smooth),
      transform 0.45s var(--ease-smooth);

    &-active {
      opacity: 1;
      filter: none;
      transform: scale(1);
    }

    :deep(.preview-card) {
      display: block;
      width: 100%;
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
        top: 42%;
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

@media (prefers-reduced-motion: reduce) {
  .projects-card {
    transition: none;
  }
}
</style>
