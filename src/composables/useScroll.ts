import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, shallowRef, onMounted, onUnmounted, watch } from "vue";
import { isTransitioning } from "./useProjectTransition";

export const lenis = shallowRef<Lenis | null>(null);
export const projectLenis = shallowRef<Lenis | null>(null);
export const velocity = ref(0);

const handleScroll = () => {
  ScrollTrigger.update();
};

export const useScroll = () => {
  const tick = (time: number) => {
    const instance = lenis.value;
    if (!instance) return;

    instance.raf(time * 1000);
    velocity.value = instance.isScrolling === "smooth" ? Math.min(Math.abs(instance.velocity * 0.75), 1) : 0;
  };

  const createNewLenis = () => {
    if (lenis.value) {
      lenis.value.off("scroll", handleScroll);
      lenis.value.destroy();
    }

    lenis.value = new Lenis({
      lerp: 0.08,
    });

    lenis.value.on("scroll", handleScroll);
  };

  onMounted(() => {
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    createNewLenis();
  });

  watch(isTransitioning, (newIsTransitioning) => {
    if (newIsTransitioning) {
      lenis.value?.stop();
      ScrollTrigger.clearScrollMemory();
    } else {
      lenis.value?.start();
      ScrollTrigger.update();
    }
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    lenis.value?.off("scroll", handleScroll);
    lenis.value?.destroy();
    lenis.value = null;
    velocity.value = 0;
  });
};
