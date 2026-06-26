<script setup>
</script>
<template>
  <HeadTemplate :title="$t('miscellaneous')" />

  <div class="items-start text-start w-full">
    <section class="default">
      
      <div class="container">
        <h1 class="flash woosh origin-left">{{ $t('miscellaneous') }}</h1>
  
        <h2 class="woosh origin-left">Discord</h2>
        <WorksCards :title="$t('misc.rcp.title')" url="/miscellaneous/discord/role-color-preview">
          {{ $t('misc.list.rcp.description') }}
        </WorksCards>

        <h2 class="woosh origin-left">
          {{ $t('misc.list.others') }}
        </h2>
        <WorksCards title="Cursed Cursor" url="/miscellaneous/cursed-cursor">
          {{ $t('misc.list.cursedCursor.description') }}
        </WorksCards>

        <WorksCards title="center" url="/miscellaneous/center">
          press f11 (i mean turn on fullscreen) and you just look at the center. that's what the dot is about.
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