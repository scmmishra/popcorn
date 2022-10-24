<script lang="ts" setup>
import buildPath from '@/api/images';
import defaultImage from '@/assets/default.png'

defineProps<{
  poster_path: string;
  title: string;
}>();

function setAltImg(event: Event) {
  event.stopPropagation()
  if (event?.target) {
    (event.target as HTMLImageElement).src = defaultImage
  }
} 
</script>
<template>
  <img @error="setAltImg" :src="buildPath(poster_path)" :alt="title" />
</template>