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

console.log(page?.title)

const title = page.value?.title || route.params.slug;
const description = page.value?.description;
</script>

<template>
  <HeadTemplate  
    :title="title"
    :description="description"
  />

  <article class="blog" v-if="page">

    <section class="title-section">
      <h1 class="title">{{ title }}</h1>
      <small class="text-sm text-gray-400">{{ description }}</small>
    </section>

    <hr />

    <section class="main-section">
      <ContentRenderer :value="page" />
    </section>

  </article>
</template>
<style scoped>
.blog {
  display: grid;
  justify-items: center;
}

.title {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.72);
}

.title-section {
  text-align: center;
}

.main-section {
  text-align: start;
  max-width: 48rem;
}
</style>