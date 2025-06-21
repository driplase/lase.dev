<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('miscellaneous')" align="start">
    <div class="container">
      <h1 class="flash woosh">{{ $t('miscellaneous') }}</h1>
      <h2 class="woosh">Discord</h2>
      <WorksCards title="Role Color Preview" url="/miscellaneous/discord/role-color-preview">
        {{ $t('misc.list.rcp.description') }}
      </WorksCards>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.container {
  width: 100%;
}
a {
  text-decoration: none;
}
</style>