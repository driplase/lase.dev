<script setup>
import WorksCards from '~/components/worksCards.vue';

</script>
<template>
  <HeadTemplate :title="$t('works')" />

  <div class="text-start items-start w-full">
    <section class="default">
    
      <div class="container">
        <EffectWrapper as="h1" flash woosh class="font-bold origin-left">{{ $t('works') }}</EffectWrapper>

        <EffectWrapper as="h2" woosh class="font-semibold origin-left">
          {{ $t('works.web') }}
        </EffectWrapper>
        <WorksCards title="j0.si" url="https://j0.si" external>
          {{ $t('works.j0si.description') }}
        </WorksCards>
        <WorksCards title="Laselxt" url="https://laselxt.vercel.app" external>
          {{ $t('works.laselxt.description') }}
        </WorksCards>
        <WorksCards :title="$t('works.pfj0si.title')" url="https://pf.j0.si" external>
          {{ $t('works.pfj0si.description') }}
        </WorksCards>
        
        <EffectWrapper as="h2" woosh class="font-semibold origin-left">
          {{ $t('works.designs') }}
        </EffectWrapper>
        <WorksCards title="treron icons" url="https://www.figma.com/community/file/1462834014192363511/icons" external>
          {{ $t('works.treron_icons.description') }}
        </WorksCards>
        
        <!-- 
        <h2 class="woosh font-semibold origin-left">
          {{ $t('works.music') }}
        </h2>
        -->

        <EffectWrapper as="h2" woosh class="font-semibold origin-left">
          {{ $t('works.fonts') }}
        </EffectWrapper>
        <WorksCards title="Eclyera" class="eclyera">
          {{ $t('works.eclyera.description') }}
        </WorksCards>
        <WorksCards title="Lixeld" class="lixeld">
          {{ $t('works.lixeld.description') }}
          <EffectWrapper as="span" wiggle woosh flash text class="inline-block">
            <NuxtLink class="inline-block" target="_blank" to="https://github.com/ScratchJP/MCmap">ScratchJP/MCmap</NuxtLink>
          </EffectWrapper>
          {{ $t('works.lixeld.description.extend') }}
        </WorksCards>
      </div>

    </section>
  </div>
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