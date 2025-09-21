<script setup>
import WorksCards from '~/components/worksCards.vue';

</script>
<template>
  <NuxtLayout name="default" :title="$t('works')" align="start">
    <section class="default">
    
      <div class="container">
        <h1 class="flash woosh font-bold origin-left">{{ $t('works') }}</h1>

        <h2 class="woosh font-semibold origin-left">
          {{ $t('works.web') }}
        </h2>
        <WorksCards title="j0.si" url="https://j0.si" external>
          {{ $t('works.j0si.description') }}
        </WorksCards>
        
        <h2 class="woosh font-semibold origin-left">
          {{ $t('works.designs') }}
        </h2>
        <WorksCards title="treron icons" url="https://www.figma.com/community/file/1462834014192363511/icons" external>
          {{ $t('works.treron_icons.description') }}
        </WorksCards>
        
        <!-- 
        <h2 class="woosh font-semibold origin-left">
          {{ $t('works.music') }}
        </h2>
        -->

        <h2 class="woosh font-semibold origin-left">
          {{ $t('works.fonts') }}
        </h2>
        <WorksCards title="Eclyera" class="eclyera">
          {{ $t('works.eclyera.description') }}
        </WorksCards>
        <WorksCards title="Lixeld" class="lixeld">
          {{ $t('works.lixeld.description') }}
          <NuxtLink class="inline-block wiggle wg-text woosh wsh-text flash" target="_blank" to="https://github.com/ScratchJP/MCmap">ScratchJP/MCmap</NuxtLink>
          {{ $t('works.lixeld.description.extend') }}
        </WorksCards>
      </div>

    </section>
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