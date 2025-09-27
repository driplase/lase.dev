<script setup>
import TranslatorIcon from './translatorIcon.vue';

const { locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const dropmenu = ref(false);

function toggle() {
  dropmenu.value = !dropmenu.value
}
</script>
<template>
  <div class="root">
    <button class="wiggle wg-text woosh" @click="toggle">
      <!-- <Icon name="tabler:world" size="24" /> -->
      <TranslatorIcon width="32" height="32"/>
      <span style="opacity: 0; font-size: 0">{{ $t('select_language') }}</span>
    </button>
    <ul :style="{ display: dropmenu ? 'block' : 'none' }" class="dropmenu">
      <li v-for="locale in locales">
        <a href="#" class="link no-ul wiggle wg-text woosh wsh-text" :key="locale.code" @click.prevent.stop="setLocale(locale.code)">
          {{ locale.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.root {
  position: relative;
  height: 32px;
}
button {
  background: transparent;
  border: none;
  color: white;
  width : 32px;
  height: 32px;
  margin: 0;
  box-shadow: none;
}
.dropmenu {
  position: absolute;
  display: block;
  list-style: none;
  inset: 36px 0px auto auto;
  width: fit-content;
  min-width: 108px;
  z-index: 16;
}
ul {
  font-size: 1.1rem;
}
.link {
  color: var(--color-text);
  display: inline-block;
  transform-origin: right center;
  padding: 2px 0 2px 8px;
  min-width: 100%;

  &:hover {
    text-decoration: underline;
  }
}
</style>