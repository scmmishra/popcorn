<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="navigation">
      <div class="logo-container">
        <img alt="Popcorn logo" class="logo" src="@/assets/brand/movie-ticket.png" width="50" height="50" />
        <span class="logo-name">Popcorn</span>
      </div>
      <ul class="links-conatiner">
        <li>
          <RouterLink to="/movies">Movies</RouterLink>
        </li>
        <li>
          <RouterLink to="/tv-shows">TV Shows</RouterLink>
        </li>
        <li>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="User" class="user-image" width="36"
            height="36" />
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>
<style lang="scss">
.header {
  border-bottom: 1px solid var(--gray-200);

  .navigation {
    max-width: 1400px;
    padding: 0.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 5px;

    .logo-name {
      font-size: 1.5rem;
      line-height: 50px;
      font-weight: 600;
    }
  }

  ul.links-conatiner {
    display: flex;
    align-items: center;
    gap: 0.2rem;

    font-size: 1rem;
    color: var(--gray-600);

    li a {
      list-style: none;
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;

      &:hover {
        color: var(--gray-800);
        background-color: var(--gray-200);
      }
    }

    .user-image {
      margin-left: 1rem;
      border-radius: 9999px;
    }
  }
}
</style>