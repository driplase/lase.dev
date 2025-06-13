<script setup>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';

const sitename = 'lase.dev';

const props = defineProps({
  title: String,
  align: String,
})

const mainAlign = ["start", "center", "end"].find(i => i === props.align) || "center";

useHead({
  title: props.title ? `${props.title} - ${sitename}` : sitename
})
</script>
<template>
  <Header />

  <main :style="{
    textAlign: mainAlign,
    alignItems: mainAlign,
  }">
    <slot />
  </main>

  <Footer />
</template>
<style scoped>
</style>