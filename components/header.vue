<script setup>
import { links } from '@/data/headerLinks';
import languageSelector from './languageSelector.vue';
const route = useRoute();
const error = useError(); // Nuxt 3 composable

const currentPath = !error.value ? route.path.replace(/\/$/, '') : null;
const navbarLinks = links.map(i => ({
  ...i,
  current: currentPath && i.url === currentPath
}));
</script>
<template>
  <header>
    <nav>
      <div class="nav-brand">
        <NuxtLink class="inline-block wiggle woosh flash no-ul lase-color bg-text-clip" href="/">lase.dev</NuxtLink>
      </div>
      <div class="nav-container">
        <div class="nav-burger">
          <NuxtLink v-for="item in navbarLinks"
            :class="'nav-link wiggle-woosh wg-text wsh-text glow ' +
              (item.current ? 'bold ' : '')
            "
            :href="item.url"
          >{{ $t(item.title) }}</NuxtLink>
        </div>
      </div>
      <div class="right-container">
        <languageSelector />
      </div>
    </nav>
  </header>
</template>
<style scoped>
  nav {
    width: 100dvw;
    padding: 5px;
    font-size: 18px;
    background: #06060fbf;
    border-bottom: 1px solid #8080809f;
    box-shadow: 0 0 8px #80808080;
    backdrop-filter: blur(8px);
    position: sticky;
    top: 0;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
  }
  .nav-brand {
    font-size: 28px;
    margin: 0 32px;
    user-select: none;
    padding: 3px;
    font-family: var(--font-monospace);
    font-style: italic;
    font-weight: 500;
    text-shadow: 0 0 8px #0072de;
    justify-content: start;
    display: inline-block;
  }
  .nav-container {
    text-align: center;
    justify-content: center;
  }
  .nav-link {
    padding: 3px 32px;
    display: inline-block;
    color: var(--color-text);
    text-decoration: none;
  }
  .right-container {
    user-select: none;
    text-align: end;
    justify-content: end;
    display: flex;
    margin-right: 16px;
  }
</style>