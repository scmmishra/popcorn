<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  options?: IntersectionObserverInit
}>();
const root = ref<HTMLElement | null>(null);
const emit = defineEmits(['intersect']);

const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  const options = props.options || {};
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit('intersect')
    }
  }, options);

  if (root.value) {
    observer.value.observe(root.value)
  }
})

onUnmounted(() => {
  observer.value?.disconnect();
})
</script>

<template>
  <div ref="root" class="observer" />
</template>
