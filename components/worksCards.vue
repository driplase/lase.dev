<script setup>
const props = defineProps({
  title: String,
  url: String,
  external: Boolean,
})

let isURLvalid = true;
try {
  new URL(props.url);
} catch {
  isURLvalid = false;
}
</script>
<template>
  <NuxtLink
    class="root-link"
    :to="props.url" 
    :target="props.external ? '_blank' : '_self'">
    <div :class="
      `card ${isURLvalid ? 'flash' : ''}`
    ">
      <h3>{{ props.title }}</h3>
      <slot />
    </div>
  </NuxtLink>
</template>
<style scoped>
.card {
  background: rgb(28, 32, 66);
  padding: 12px 16px;
  padding-top: 6px;
  margin: 8px 4px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid rgb(123, 127, 129);
  box-shadow: 0 0 8px rgba(123, 127, 129, 0.63);
  width: 100%;
}
.root-link {
  color: var(--color-text);
  text-decoration: none;
}
</style>