<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  options?: IntersectionObserverInit
}>();
const root = ref<HTMLElement | null>(null);
const emit = defineEmits(['intersect']);

const observer = ref<IntersectionObserver | null>(null)

const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
  if (entry && entry.isIntersecting) {
    emit('intersect')
  }
}

function resetObserver() {
  observer.value?.disconnect();
}

onMounted(() => {
  const options = props.options || {};
  observer.value = new IntersectionObserver(observerCallback, options);

  if (root.value) {
    observer.value.observe(root.value)
  }
})

onUnmounted(resetObserver)
</script>

<template>
  <div ref="root" class="observer" />
</template>
