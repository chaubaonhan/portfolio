<script setup lang="ts">
import { computed } from "vue";
import { tagLabels, type TagVariant } from "./tagVariants";

const props = defineProps<{
  variant: TagVariant;
}>();

const classes = computed(() => ["tag", `tag-variant-${props.variant}`]);
</script>

<template>
  <div :class="classes">
    <p class="tag-copy">{{ tagLabels[props.variant] }}</p>
  </div>
</template>

<style scoped lang="scss">
.tag {
  border-radius: var(--radius-md);
  padding: calc(var(--space-xxs) - var(--stroke-md)) calc(var(--space-sm  ) - var(--stroke-md));
  border: var(--stroke-md) solid transparent;

  &-copy {
    font-size: var(--font-size-xs);
    font-weight: 700;
  }

  &-variant {
    &-nlp {
      background-color: #34bfff;
      color: #002474;
    }

    &-dataset {
      background-color: #e1f5ff;
      color: #002474;
    }

    &-transformers {
      background-color: #ff8400;
      color: white;
    }

    &-research {
      background-color: #052e87;
      color: white;
    }

    &-ai {
      background-color: #d8ff42;
      color: #001341;
    }

    &-backend {
      background-color: #2d2a24;
      color: white;
    }

    &-deployment {
      background-color: #0086bb;
      color: white;
    }

    &-systems {
      background-color: #bae9ff;
      color: #002474;
    }

    &-retrieval {
      background-color: #2674a4;
      color: white;
    }

    &-rag {
      background-color: #ffdf4f;
      color: #362d03;
    }

    &-llm {
      background-color: #95630e;
      color: white;
    }

    &-three {
      background-color: #ed9c55;
      color: #492708;
    }

    &-react {
      background-color: #61dafb;
      color: #0f2e36;
    }

    &-websockets {
      background-color: #2674a4;
      color: white;
    }

    &-redis {
      background-color: #ce4036;
      color: white;
    }

    &-html {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-css {
      color: var(--color-text-400);
      border-color: var(--color-grayscale-400);
    }

    &-javascript {
      background-color: #ffdf4f;
      color: #362d03;
    }

    &-node {
      background-color: #237d23;
      color: white;
    }

    &-next {
      background-color: white;
      color: black;
    }

    &-kubernetes {
      background-color: #326ce5;
      color: white;
    }

    &-postgresql {
      background-color: #2f6c92;
      color: white;
    }

    &-ogl {
      background-color: #0e5495;
      color: white;
    }

    &-glsl {
      background-color: #95630e;
      color: white;
    }
  }
}
</style>
