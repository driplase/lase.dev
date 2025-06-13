<script setup>
const props = defineProps({
  title: String,
})
</script>
<template>
  <div class="card">
    <h3>{{ props.title }}</h3>
    <slot />
  </div>
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
</style>