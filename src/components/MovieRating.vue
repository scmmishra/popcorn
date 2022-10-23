<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  value: number;
}>(), {
  value: 0,
});

const strokeWidth = 4
const size = 36
const ringColor = '#164e63'
const progressColor = '#22d3ee'

const percentage = computed(() => (props.value / 10) * 100);
const radius = computed(() => size / 2 - strokeWidth / 2);
const dasharray = computed(() => Math.PI * radius.value * 2);
const dashoffset = computed(() => dasharray.value * (1 - percentage.value / 100));
const progressNumber = computed(() => Math.round(percentage.value));

if (import.meta.env.DEV) {
  if (props.value > 10 || props.value < 0) {
    console.warn(`Invalid rating, required value between 0 and 10, got ${props.value}`)
  }
}

const circleProps = computed(() => ({
  r: radius.value,
  cx: size / 2,
  cy: size / 2,
  'stroke-width': 4,
  fill: 'none'
}))

</script>
<template>
  <div class="circle-progress" :style="{width:size+'px',height:size+'px'}" :data-pct="progressNumber">
    <svg :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="ring" :stroke="ringColor" v-bind="circleProps">
      </circle>
      <circle class="progress_circle" :stroke="progressColor" v-bind="circleProps" :stroke-width="strokeWidth"
        :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"></circle>
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
</style>