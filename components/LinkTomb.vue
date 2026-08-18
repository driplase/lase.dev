<script setup lang="ts">
import { type Link } from '~/data/links';
defineProps<{
  link: Link
}>()
</script>

<template>
  <div class="dead-link-tomb">
    <!-- <div class="tomb-text-content" v-if="$slots.default">
      <slot class="tomb-text-title" />
    </div>
    <div class="tomb-text tomb-text-title" v-else>
      {{ link.title }}
    </div> -->
    <NuxtImg
      class="link-header tomb-text-content" 
      :src="link.imageURL" 
      :alt="link.title"
      decoding="async"
      draggable="false"
      v-if="link.imageURL"
    />
    <div class="tomb-text tomb-text-title" v-else>
      {{ link.title }}
    </div>
    <div class="tomb-text tomb-text-url">
      {{ link.url }}
    </div>
    <div class="tomb-text tomb-text-description" v-if="link.description">
      {{ link.description }}
    </div>
  </div>
</template>

<style scoped>
.dead-link-tomb {
  background: url('/assets/images/dead-link/headstone_clipped.webp');
  width: 240px;
  height: auto;
  background-size: cover;
  aspect-ratio: 871 / 831;
  position: relative;
}

.tomb-text {
  color: #7e7e7e;
  font-family: "Schoolbell", "Nanum Pen Script", "Gamja Flower";
  font-weight: 700;
  position: absolute;
  transform: translateX(-50%);
}
.tomb-text-title {
  top: 5rem;
  left: 120px;
  font-size: 40px;
  width: max-content;
}
.tomb-text-content {
  top: 5.25rem;
  left: 120px;
  width: 160px !important;
  height: 60px !important;
  position: absolute;
  width: max-content;
  transform: translateX(-50%);
}
.tomb-text-url {
  font-size: 16px;
  top: 9rem;
  left: 120px;
  width: max-content;
}
.tomb-text-description {
  font-size: 12px;
  top: 10.325rem;
  left: 120px;
  width: max-content;
}
</style>