<script setup lang="ts">
import { useBlobSrc } from "../../../composables/useBlobSrc";

const props = defineProps<{ src: string; alt: string }>();
const imageSrc = useBlobSrc(() => props.src);
</script>

<template>
  <img :src="imageSrc" :alt="props.alt" width="1200" height="430" loading="lazy" />
</template>
