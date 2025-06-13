<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('home')" align="center">
    <p class="aboutme">{{ $t('home_aboutme') }}</p>
  </NuxtLayout>
</template>
<style scoped>
p.aboutme {
  white-space: pre;
}
</style>