<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Header from "./components/Header.vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import SiteStats from "./components/SiteStats.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useRouteObserver } from "./composables/useRouteObserver";
import Home from "./features/home/components/Home.vue";
import Project from "./features/projects/components/Project.vue";
import { useProjectTransition } from "./composables/useProjectTransition";
import { useScroll } from "./composables/useScroll";
import { projectVisible } from "./composables/useRouteObserver";
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useClickSound } from "./features/sounds/composables/useClickSounds";
//import { useHoverSound } from "./features/sounds/composables/useHoverSounds";

const { isTransitioning } = useProjectTransition();

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll();
useRouteObserver();
useClickSound();
//useHoverSound();
const { isTouch } = useAgent();

// Discourage saving media: no context menu or drag on images, videos, and the 3D canvas.
const isProtectedMedia = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest("img, video, canvas, picture");

const blockMediaEvent = (event: Event) => {
  if (isProtectedMedia(event.target)) event.preventDefault();
};

onMounted(() => {
  document.addEventListener("contextmenu", blockMediaEvent);
  document.addEventListener("dragstart", blockMediaEvent);
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", blockMediaEvent);
  document.removeEventListener("dragstart", blockMediaEvent);
});
</script>

<template>
  <Header />

  <!-- main page -->
  <div :class="{ 'home-wrapper-projectIsReady': projectVisible }">
    <Home />
  </div>

  <!-- overlay page -->
  <ProjectBackground />
  <div
    class="project-wrapper"
    :class="{
      'project-wrapper-visible': projectVisible,
      'project-wrapper-transitioning': isTransitioning,
    }"
  >
    <div class="project-content">
      <Project />
    </div>
  </div>

  <SiteStats v-show="!projectVisible" />
  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
img,
video,
canvas {
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  user-select: none;
}

.home-wrapper-projectIsReady {
  visibility: hidden;
  position: fixed;
  inset: 0;
}

.project-wrapper {
  position: fixed; /* <-- key */
  inset: 0;
  overflow: hidden; /* new page must NOT scroll during transition */
  z-index: var(--z-index-layout-project);
  visibility: hidden;
  pointer-events: none; /* avoid interaction before fully opened */

  &-visible {
    visibility: visible;
    pointer-events: auto;
    position: static;
  }
}

.project-content {
  width: 100%;
  height: 100%;
  overflow: hidden; /* ensure no scroll container */
}
</style>
