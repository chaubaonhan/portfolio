import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

export const useCenteredCarousel = (itemCount: Ref<number>, initialIndex = 0) => {
  const trackRef = ref<HTMLElement | null>(null);
  const activeIndex = ref(initialIndex);
  let frame = 0;
  let resizeObserver: ResizeObserver | null = null;

  const boundedIndex = (index: number) => Math.max(0, Math.min(index, Math.max(itemCount.value - 1, 0)));

  const updateActiveIndex = () => {
    const track = trackRef.value;
    if (!track || !track.children.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const childCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(trackCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndex.value = closestIndex;
  };

  const handleScroll = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateActiveIndex);
  };

  const goTo = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.value;
    const nextIndex = boundedIndex(index);
    const item = track?.children.item(nextIndex) as HTMLElement | null;
    if (!track || !item) return;

    activeIndex.value = nextIndex;
    track.scrollTo({
      left: item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2,
      behavior,
    });
  };

  const previous = () => goTo(activeIndex.value - 1);
  const next = () => goTo(activeIndex.value + 1);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(itemCount.value - 1);
    }
  };

  const focusInactiveItem = (event: MouseEvent, index: number) => {
    if (index === activeIndex.value) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  const refresh = async () => {
    await nextTick();
    goTo(boundedIndex(activeIndex.value), "auto");
    updateActiveIndex();
  };

  watch(itemCount, refresh);

  onMounted(async () => {
    await nextTick();
    const track = trackRef.value;
    if (!track) return;

    track.addEventListener("scroll", handleScroll, { passive: true });
    resizeObserver = new ResizeObserver(() => goTo(activeIndex.value, "auto"));
    resizeObserver.observe(track);
    goTo(initialIndex, "auto");
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    trackRef.value?.removeEventListener("scroll", handleScroll);
    resizeObserver?.disconnect();
  });

  return {
    trackRef,
    activeIndex,
    isAtStart: computed(() => activeIndex.value <= 0),
    isAtEnd: computed(() => activeIndex.value >= itemCount.value - 1),
    previous,
    next,
    goTo,
    handleKeydown,
    focusInactiveItem,
  };
};
