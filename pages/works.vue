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
      <WorksCards title="Eclyera" class="eclyera">
        {{ $t('works.eclyera.description') }}
      </WorksCards>
      <WorksCards title="Lixeld">
        {{ $t('works.lixeld.description') }}
        <NuxtLink class="inline-block wiggle wg-text woosh wsh-text flash" target="_blank" to="https://github.com/ScratchJP/MCmap">ScratchJP/MCmap</NuxtLink>
        {{ $t('works.lixeld.description.extend') }}
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