<script setup>
import WorksCards from '~/components/worksCards.vue';

</script>
<template>
  <NuxtLayout name="default" :title="$t('works')" align="start">
    <div class="container">
      <h1 class="flash woosh">{{ $t('works') }}</h1>
      <h2 class="woosh">web</h2>
      <WorksCards title="j0.si" url="https://j0.si" external>
        {{ $t('works.j0si.description') }}
      </WorksCards>
      <h2 class="woosh">fonts</h2>
      <WorksCards title="Eclyera">
        {{ $t('works.eclyera.description') }}
      </WorksCards>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.container {
  width: 100%;
}
.links {
  padding: 4px;
}
a {
  text-decoration: none;
}
</style>