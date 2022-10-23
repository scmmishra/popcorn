<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: number;
  value: number;
  strokeWidth?: number;
  ringColor?: string;
  progressColor?: string;
}>(), {
  size: 37,
  value: 0,
  strokeWidth: 4,
  ringColor: '#164e63',
  progressColor: '#22d3ee',
});

const percentage = computed(() => (props.value / 10) * 100);

const radius = computed(() => props.size / 2 - props.strokeWidth / 2);
const dasharray = computed(() => Math.PI * radius.value * 2);
const dashoffset = computed(() => dasharray.value * (1 - percentage.value / 100));
const progressNumber = computed(() => Math.round(percentage.value));

</script>
<template>
  <div class="circle-progress" :style="{width:size+'px',height:size+'px'}" :data-pct="progressNumber">
    <svg :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="ring" :stroke="ringColor" :r="radius" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth"
        fill="none">
      </circle>
      <circle class="progress_circle" :stroke="progressColor" :r="radius" :cx="size/2" :cy="size/2"
        :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.circle-progress {
  position: relative;
  text-align: center;
}

.circle-progress:after {
  content: attr(data-pct);
  font-size: 1rem;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.circle-progress svg {
  transform: rotate(-90deg);
}

.circle-progress .progress_circle {
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}

.circle-percentage {
  font-size: 75%;
}
</style>