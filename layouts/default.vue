<script setup>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
</script>
<template>
  <Header />

  <main class="items-center text-center">
  
    <slot />

  </main>

  <Footer />
</template>
<style scoped>
</style>