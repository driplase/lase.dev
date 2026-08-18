<script setup>
</script>
<template>
  <HeadTemplate :title="$t('miscellaneous')" />

  <div class="items-start text-start w-full">
    <section class="default">
      
      <div class="container">
        <EffectWrapper as="h1" flash woosh class="origin-left">{{ $t('miscellaneous') }}</EffectWrapper>
  
        <EffectWrapper as="h2" woosh class="origin-left">Discord</EffectWrapper>
        <WorksCards :title="$t('misc.rcp.title')" url="/miscellaneous/discord/role-color-preview">
          {{ $t('misc.list.rcp.description') }}
        </WorksCards>

        <EffectWrapper as="h2" woosh class="origin-left">
          {{ $t('misc.list.others') }}
        </EffectWrapper>
        <WorksCards title="Cursed Cursor" url="/miscellaneous/cursed-cursor">
          {{ $t('misc.list.cursedCursor.description') }}
        </WorksCards>

        <WorksCards title="center" url="/miscellaneous/center">
          press f11 (i mean turn on fullscreen) and you just look at the center. that's what the dot is about.
        </WorksCards>

        <WorksCards :title="$t('misc.tanabata.title')" url="/miscellaneous/tanabata">
          {{ $t('misc.tanabata.description') }}
        </WorksCards>
      </div>

    </section>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
}
a {
  text-decoration: none;
}
</style>