<script setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ 
    statusCode: 404, 
    statusMessage: `Page Not Found: ${route.path}`, 
  })
}

const title = page?.title || route.params.slug;
</script>

<template>
  <NuxtLayout 
    name="default" 
    :title="title"
    :description="page?.description"
    align="start"
  >

    <article class="blog" v-if="page">
      <h1>{{ title }}</h1>
      <ContentRenderer :value="page" />
    </article>

  </NuxtLayout>
</template>
<style scoped>
</style>