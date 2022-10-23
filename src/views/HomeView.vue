<script setup lang="ts">
import { MovieService } from '@/api';
import buildPath from '@/api/images';
import { onMounted, ref, onUnmounted } from 'vue';
import { formatDate } from '@/utils/date'

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

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
  loadMore()
})
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const handleScroll = () => {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 500;
  if (bottomOfWindow) {
    loadMore()
  }
}
</script>

<template>
  <main class="list-component">
    <section class="area">
      <div class="movie-grid">
        <div v-for="movie in moviesToDisplay" class="movie-card">
          <img :src="buildPath(movie.poster_path)" :alt="movie.title" />
          <div class="movie-card-overlay">
            <div>
              <h4>{{ movie.title }}</h4>
              <p style="margin-top: 0.5rem">{{ formatDate(movie.release_date) }}</p>
            </div>
          </div>
        </div>
        <template v-if="loadingMore">
          <div v-for="ii in 20" class="movie-card loading">
            <img src="@/assets/default.png" />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;

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
        background: linear-gradient(to top, rgba(1, 1, 1, 1.0) 10%, rgba(255, 255, 255, 0));
        color: white;
        align-items: flex-end;
        padding: 1rem;

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

      &.loading {
        animation: Pulsate 1s infinite;
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