<script setup lang="ts">
import { MovieService } from '@/api';
import buildPath from '@/api/images';

const movieApi = new MovieService()

const upcomingMovies = await movieApi.upcoming()
</script>

<template>
  <main>
    <section class="main-carousel">
      <img src="/sample-poster.png">
    </section>
    <section class="area">
      <h2>Upcoming Movies</h2>
      <div class="movie-grid">
        <div v-for="movie in upcomingMovies.results" class="movie-card">
          <img :src="buildPath(movie.poster_path)" :alt="movie.title" />
        </div>
      </div>
    </section>
    <section class="area">
      <h2>TV Shows</h2>
      <div class="movie-grid">
        <div v-for="ii in 6" class="movie-card">
        </div>
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
      aspect-ratio: 2/3;
      height: auto;
      border-radius: 0.5rem;
      background-color: var(--gray-200);
      overflow: hidden;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>