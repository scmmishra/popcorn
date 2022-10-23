<script setup lang="ts">
import buildPath from '@/api/images';
import { formatDate } from '@/utils/date';
import MovieRating from './MovieRating.vue';

defineProps<{
  poster_path: string;
  title: string;
  vote_average: string;
  release_date: string;
}>();
</script>

<template>
  <div class="movie-card">
    <img :src="buildPath(poster_path)" :alt="title" />
    <div class="movie-card-overlay">
      <div class="rating-container">
        <MovieRating :value="Number(vote_average)"></MovieRating>
      </div>
      <div class="info-container">
        <h4>{{ title }}</h4>
        <p style="margin-top: 0.5rem">{{ formatDate(release_date) }}</p>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.movie-card {
  position: relative;
  aspect-ratio: 2/3;
  height: auto;
  border-radius: 0.5rem;
  background-color: var(--gray-200);
  overflow: hidden;
  transition-property: transform;
  transition-duration: 0.3s;

  .movie-card-overlay {
    display: none;
    inset: 0;
    position: absolute;
    background-color: var(--gray-200);
    background: linear-gradient(to top, rgba(1, 1, 1, 1.0), rgba(255, 255, 255, 0));
    color: white;
    flex-direction: column;
    justify-content: space-between;

    .info-container {
      padding: 1rem;
    }

    .rating-container {
      height: 50%;
      padding: 1rem;
      flex-grow: 1;
      background: linear-gradient(to bottom, rgba(1, 1, 1, 0.5) 0%, rgba(255, 255, 255, 0) 30%);
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  img {
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);

    .movie-card-overlay {
      display: flex;
    }
  }
}
</style>