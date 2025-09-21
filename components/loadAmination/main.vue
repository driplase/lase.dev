<script setup>
import spacer4719 from './spacer4719.vue';

const route = useRoute();

// debug value
const debug = ""

const animation = ref(debug)

onMounted(async () => {
  const referrer = document.referrer ? new URL(document.referrer) : null

  if (
    referrer?.host === "spacer4719.f5.si" ||
    route.query?.utm_source === "spacer4719"
  ) {
    animation.value = "spacer4719"
  }
})
</script>
<template>
  <spacer4719 v-if="animation === 'spacer4719'" />
</template>