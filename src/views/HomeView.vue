<script setup lang="ts">
import { MovieService } from '@/api';
import Observer from '@/components/Observer.vue';
import { ref } from 'vue';
import MovieCard from '../components/MovieCard.vue'

const movieApi = new MovieService()
let upcomingMovies = await movieApi.topRated()
const currentPage = ref(1)
const loadingMore = ref(false)
const totalPages = ref(upcomingMovies.total_pages)

const loadMore = async () => {
  if (currentPage.value >= totalPages.value) {
    return
  }

  loadingMore.value = true
  currentPage.value = currentPage.value + 1
  const nextMovies = await movieApi.upcoming(currentPage.value)
  totalPages.value = nextMovies.total_pages
  moviesToDisplay.value.push(...nextMovies.results)
  loadingMore.value = false
}

const moviesToDisplay = ref(upcomingMovies.results)
</script>

<template>
  <main class="list-component">
    <section class="area">
      <div class="movie-grid">
        <MovieCard v-for="movie in moviesToDisplay" :key="movie.id" :poster_path="movie.poster_path"
          :title="movie.title" :release_date="movie.release_date" :vote_average="movie.vote_average">
        </MovieCard>
        <Observer @intersect="loadMore"></Observer>
        <template v-if="loadingMore">
          <div v-for="ii in 20" :key="ii" class="movie-card-loader">
            <img src="@/assets/default.png" />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

main {
  max-width: 1400px;
  padding: 1rem 0.5rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .main-carousel {
    overflow: hidden;
    height: 400px;
    background-color: var(--gray-200);
    border-radius: 0.5rem;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .area {
    h2 {
      margin-bottom: 1rem;
    }
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;

    @include breakpoint(md, min) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .movie-card-loader {
      position: relative;
      aspect-ratio: 2/3;
      height: auto;
      border-radius: 0.5rem;
      background-color: var(--gray-200);
      overflow: hidden;
      transition-property: transform;
      transition-duration: 0.3s;
      animation: Pulsate 3s infinite ease-in;
      width: 100%;
      object-fit: cover;

      img {
        width: 100%;
      }
    }
  }
}

@keyframes Pulsate {
  from {
    opacity: 0.5;
  }

  50% {
    opacity: 0;
  }

  to {
    opacity: 0.5;
  }
}
</style>