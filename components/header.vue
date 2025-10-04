<script setup>
import { links } from '@/data/headerLinks';
import languageSelector from './languageSelector.vue';
import { gsap } from 'gsap';

const route = useRoute();
const error = useError(); // Nuxt 3 composable

const burgerMenu = ref(false);

let currentMenuTransition;

function toggleBurger(which, onlyWhenBurgerExists, disableTransition) {
  if (!onlyWhenBurgerExists || (onlyWhenBurgerExists && window.innerWidth < 1024)) {
    if (typeof which === "boolean") {
      burgerMenu.value = which;
    } else {
      burgerMenu.value = !burgerMenu.value
    }

    const show = {
      right: 0,
      opacity: 1,
      filter: 'blur(0px)',
      userSelect: "auto",
      pointerEvents: "auto",
    }
    const hide = {
      right: "-45vw",
      opacity: 0,
      filter: 'blur(8px)',
      userSelect: "none",
      pointerevents: "none",
    }
  
    // prevent buggy transition when spam clicked
    if (currentMenuTransition) currentMenuTransition.kill();
  
    if (burgerMenu.value) {
      gsap.set('.menu-contents', hide)
      currentMenuTransition = gsap.to('.menu-contents', {
        ...show,
        ease: "expo.out",
        duration: .5 * !disableTransition,
      })
    } else {
      gsap.set('.menu-contents', show)
      currentMenuTransition = gsap.to('.menu-contents', {
        ...hide,
        ease: "power4.out",
        duration: .8 * !disableTransition
      })
    }
  }
}

const currentPath = ref(!error.value ? route.path.replace(/\/$/, '') : null);

watch(route, (newRoute) => {
  currentPath.value = !error.value ? newRoute.path.replace(/\/$/, '') : null
})

onMounted(() => {
  let previousWindowWidth = window.innerWidth;

  if (window.innerWidth >= 1024) toggleBurger(true, false, true)

  window.addEventListener('resize', event => {
    if (window.innerWidth >= 1024) {
      toggleBurger(true, false, true)
    } else {
      if (previousWindowWidth >= 1024) {
        toggleBurger(false, false, true)
      }
    }
    previousWindowWidth = window.innerWidth;
  })
})
</script>
<template>
  <header>
    <div class="nav-brand">
      <NuxtLink class="inline-block wiggle woosh flash no-ul lase-color bg-text-clip" href="/">lase.dev</NuxtLink>
    </div>
    <nav class="nav-container">
      <!-- prefetch x icon -->
      <Icon name="tabler:x" size="24" class="hidden"/>

      <div class="nav-burger">
        <button
          @click="toggleBurger()" 
          class="wiggle woosh burger-mode"
          aria-label="Menu"
        >
          <div style="width: 24px; height: 24px;">
            <Icon name="tabler:x" size="24" v-if="burgerMenu"/>
            <Icon name="tabler:menu-2" size="24" v-else />
          </div>
        </button>
        <div class="menu-contents">
          <NuxtLink v-for="(item, idx) in links"
            :class="'nav-link wiggle woosh wg-text wsh-text glow ' +
              (item.url === currentPath ? 'bold ' : '')
            "
            :href="item.url"
            @click="toggleBurger(false, true)"
            :style="{
              pointerEvents: burgerMenu ? 'auto' : 'none',
              touchAction: burgerMenu ? 'manipulation' : 'none',
            }"
            :tabindex="burgerMenu - 1"
            :key="idx"
          >{{ $t(item.title) }}</NuxtLink>
        </div>
      </div>
    </nav>
    <div class="right-container">
      <languageSelector />
    </div>
  </header>
</template>
<style scoped>
header {
  width: 100dvw;
  font-size: 18px;
  background: #06060fbf;
  border-bottom: 1px solid #8080809f;
  box-shadow: 0 0 8px #80808080;
  position: sticky;
  top: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  z-index: 128;
  backdrop-filter: blur(8px);
  height: 54px;
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

  & > a {
    padding: 0 .32rem;
  }
}
nav {
  text-align: center;
  justify-content: center;
}
.nav-link {
  padding: 3px 32px;
  display: inline-block;
  color: var(--color-text);
  text-decoration: none;
  transition: font-weight .16s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    text-decoration: underline;
  }
}
.right-container {
  user-select: none;
  text-align: end;
  justify-content: end;
  display: flex;
  margin: 3px 8px;
  margin-right: 24px;
}
.burger-mode {
  padding: 6px;
  border-radius: 8px;
  color: var(--color-text);

  border: none;
  background: transparent;
  box-shadow: none;
  display: inline-block;
}
@media screen and (max-width: 1023px) {
  header {
    grid-template-columns: 1fr 0fr 0fr;
  }
  .menu-contents {
    position: fixed;
    inset: 54px -45vw 0 auto;
    opacity: 0;
    height: 100vh;
    min-width: 240px;
    width: 32vw;
    display: flex;
    flex-direction: column;
    align-items: end;
    padding: 16px 24px;
    z-index: 8;
    background: rgba(27, 29, 44, 0.9);
    box-shadow: 0 0 8px color-mix(in srgb, var(--color-gray-500), transparent 50%);
    border-left: 1px solid color-mix(in srgb, var(--color-gray-500), transparent 36%);
    backdrop-filter: blur(8px);
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
  }
  .nav-link {
    padding: 6px 12px;
    margin: 2px 0;
    font-size: 1.4rem;
    transform-origin: right center;
  }
}
@media screen and (min-width: 1024px) {
  .burger-mode {
    display: none;
    user-select: none;
    pointer-events: none;
  }
}
</style>