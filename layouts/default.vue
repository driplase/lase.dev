<script setup>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';

const sitename = 'lase.dev';

const props = defineProps({
  title: String,
  align: String,
  description: String,
})

const mainAlign = ["start", "center", "end"].find(i => i === props.align) || "center";

const route = useRoute();

useHead({
  title: props.title ? `${props.title} - ${sitename}` : sitename,
  meta: [
    {
      property: "og:title",
      content: props.title ? `${props.title} - ${sitename}` : sitename
    },
    {
      property: "og:url",
      content: new URL(route.fullPath, 'https://lase.dev').href
    },
    {
      property: "og:description",
      content: props.description || ""
    },
    {
      name: "description",
      content: props.description || ""
    },
  ]
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