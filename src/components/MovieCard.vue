<script setup lang="ts">
import { formatDate } from '@/utils/date';
import MovieRating from './MovieRating.vue';
import MoviePosterImage from './MoviePosterImage.vue';

defineProps<{
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}>();
</script>

<template>
  <div class="movie-card">
    <MoviePosterImage :poster_path="poster_path" :title="title" />
    <div class="movie-card-overlay">
      <div class="rating-container">
        <MovieRating :value="vote_average"></MovieRating>
      </div>
      <div class="info-container">
        <h4>{{ title }}</h4>
        <p>{{ formatDate(release_date) }}</p>
      </div>
    </div>
    <div>
      <h5>{{ title }}</h5>
      <p>{{ formatDate(release_date) }}</p>
    </div>
  </div>

</template>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.movie-card {
  border-radius: 0.5rem;
  overflow: hidden;
  transition-property: transform;
  transition-duration: 0.3s;

  @include breakpoint(md, min) {
    aspect-ratio: 2/3;
    position: relative;
    height: auto;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  h5 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }

  .movie-card-overlay {
    display: none;
    inset: 0;
    position: absolute;
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
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  @include breakpoint(md, min) {
    &:hover {
      transform: scale(1.05);
      z-index: 1;

      .movie-card-overlay {
        display: flex;
      }
    }
  }
}
</style>