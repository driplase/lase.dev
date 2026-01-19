<script setup>
const route = useRoute()
const { data } = await useAsyncData('blog', () => {
  return queryCollection('content').all()
})

const blogs = data.value.filter(item => item.path.startsWith('/blog'))
  .sort((a, b) => {
    new Date(b.createdAt)?.getTime() - new Date(a.createdAt)?.getTime()
  })
</script>

<template>
  <HeadTemplate 
    :title="$t('blog')"
    :description="$t('blog.description')"
  />

  <section class="default">

    <div class="shade"></div>

    <section class="top-field">
      <h1>{{ $t('blog') }}</h1>
      <p class="text-gray-300">
        {{ $t('blog.description') }}
        
        <br />
        
        <span class="text-gray-500 text-sm font-mono">
          {{ $t('blog.description.wip') }}
        </span>
      </p>
    </section>

    <section>
      <WorksCards
        v-for="post in blogs" 
        :title="post.title"
        :url="post.path"
      >
        {{ post.description }}
      </WorksCards>

      <WorksCards>
        {{ $t('blog.broken.description') }}
      </WorksCards>
    </section>
    
  </section>
</template>

<style scoped>
.shade {
  position: absolute;
  top: 0;
}
</style>