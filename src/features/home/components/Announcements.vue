<script setup lang="ts">
import { computed } from "vue";
import Banner from "../../../components/Banner.vue";
import ButtonRound from "../../../components/ButtonRound.vue";
import Link from "../../../components/Link.vue";
import NotchSection from "../../../components/NotchSection.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import { useCenteredCarousel } from "../../../composables/useCenteredCarousel";
import { announcements } from "../../../content/announcements";

const announcementCount = computed(() => announcements.length);
const { trackRef, activeIndex, previous, next, handleKeydown, focusInactiveItem } =
  useCenteredCarousel(announcementCount);
</script>

<template>
  <section class="announcements">
    <NotchSection class="announcements-notch-end" />

    <div class="grid announcements-heading-grid">
      <div class="announcements-heading">
        <Banner class="announcements-heading-banner" copy="Latest" size="sm" animated />
        <h2 class="announcements-heading-title">Announcements</h2>
        <p class="announcements-heading-copy">
          Recent papers, releases, and milestones from my research and engineering work.
        </p>
      </div>
    </div>

    <div class="announcements-carousel">
      <div
        ref="trackRef"
        class="announcements-cards"
        role="region"
        aria-label="Announcements carousel"
        tabindex="0"
        @keydown="handleKeydown"
      >
        <article
          v-for="(announcement, index) in announcements"
          :key="announcement.title"
          :class="['announcement-card', { 'announcement-card-active': activeIndex === index }]"
          @click.capture="focusInactiveItem($event, index)"
        >
          <div class="announcement-card-top">
            <span class="announcement-card-date">{{ announcement.date }}</span>
            <span class="announcement-card-category">
              <span v-if="index === 0" class="announcement-card-dot"></span>
              {{ announcement.category }}
            </span>
          </div>

          <div class="announcement-card-content">
            <h3 class="announcement-card-title">{{ announcement.title }}</h3>
            <p class="announcement-card-description">{{ announcement.description }}</p>
          </div>

          <div v-if="announcement.to || announcement.href" class="announcement-card-footer">
            <Link
              :to="announcement.to"
              :href="announcement.href"
              :external="!!announcement.href"
              class="announcement-card-link"
              data-hoversound="hover"
              data-sound="click"
            >
              {{ announcement.linkLabel ?? "Read more" }}
              <ArrowRightLong class="announcement-card-link-icon" />
            </Link>
          </div>
        </article>
      </div>

      <div class="announcements-carousel-controls">
        <ButtonRound
          class="announcements-carousel-button announcements-carousel-button-previous"
          variant="accent"
          size="lg"
          aria-label="Previous announcement"
          @click="previous"
        >
          <ArrowRight class="announcements-carousel-arrow announcements-carousel-arrow-previous" />
        </ButtonRound>

        <div class="announcements-carousel-status" aria-live="polite">
          <span>{{ String(activeIndex + 1).padStart(2, "0") }}</span>
          <span class="announcements-carousel-status-line"></span>
          <span>{{ String(announcementCount).padStart(2, "0") }}</span>
        </div>

        <ButtonRound
          class="announcements-carousel-button announcements-carousel-button-next"
          variant="accent"
          size="lg"
          aria-label="Next announcement"
          @click="next"
        >
          <ArrowRight class="announcements-carousel-arrow" />
        </ButtonRound>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.announcements {
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
    content: "NEWS FEED / 02";
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
    color: var(--color-beige-600);
    --icon-color: var(--color-beige-600);
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
    --carousel-card-width: min(82vw, 460px);

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
      --carousel-card-width: min(48vw, 460px);
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

.announcement-card {
  --card-accent: var(--color-orange-400);

  display: flex;
  flex: 0 0 var(--carousel-card-width);
  flex-direction: column;
  width: var(--carousel-card-width);
  min-width: 0;
  min-height: 380px;
  border: var(--stroke-md) solid var(--color-black-400);
  border-radius: var(--radius-xl);
  background: var(--color-beige-400);
  overflow: hidden;
  opacity: 0.24;
  filter: saturate(0.55);
  scroll-snap-align: center;
  scroll-snap-stop: always;
  transform: scale(0.9);
  transform-origin: center;
  transition:
    opacity 0.45s var(--ease-smooth),
    filter 0.45s var(--ease-smooth),
    transform 0.35s var(--ease-smooth),
    box-shadow 0.35s var(--ease-smooth);

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

  @include mixins.hover {
    &:hover.announcement-card-active {
      transform: translateY(-10px) rotate(-0.4deg);
      box-shadow: 0 18px 0 rgba(45, 42, 36, 0.12);
    }
  }

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    border-bottom: var(--stroke-md) solid var(--color-black-400);
    background-image:
      linear-gradient(rgba(45, 42, 36, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45, 42, 36, 0.06) 1px, transparent 1px);
    background-size: 18px 18px;
  }

  &-date {
    color: var(--card-accent);
    font-family: "ProFontWindows";
    font-size: var(--font-size-title-xs);
    font-weight: 700;
  }

  &-category {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 6px 14px;
    border: var(--stroke-md) solid var(--color-black-400);
    border-radius: 100px;
    background: var(--color-white-400);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transform: rotate(2deg);
  }

  &-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-orange-400);
    animation: announcement-pulse 1.6s ease-in-out infinite;
  }

  &-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 900;
    line-height: var(--line-height-title);
  }

  &-description {
    color: var(--color-text-300);
    line-height: var(--line-height-copy);
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 68px;
    padding: var(--space-md) var(--space-lg);
    border-top: var(--stroke-md) solid var(--color-black-400);
  }

  &-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--card-accent);
    font-family: "ProFontWindows";
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;

    &-icon {
      width: var(--icon-size-sm);
      --icon-color: currentColor;
    }
  }
}

@keyframes announcement-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}

@media (prefers-reduced-motion: reduce) {
  .announcement-card,
  .announcement-card-dot {
    transition: none;
    animation: none;
  }
}
</style>
