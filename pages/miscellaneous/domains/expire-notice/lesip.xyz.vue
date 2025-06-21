<script setup>
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const expiresAt = dayjs('2025-7-10');

</script>
<template>
  <NuxtLayout name="default" :title="$t('miscellaneous')" align="start">
    <div class="container">
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