<script setup lang="ts">
useHeadTemplate(useRoute(), {
  title: "center",
  description: "press f11 (i mean turn on fullscreen) and you just look at the center. that's what the dot is about."
})
</script>

<template>
  <p>
    press f11 (i mean turn on fullscreen) and you just look at the center.<br />
    that's what the dot is about.
  </p>

  <div class="fixed inset-0 flex items-center justify-center pointer-events-none select-none">
    <div class="bait flex items-center justify-center pointer-events-none select-none">
      <!-- i'm not going to add arrows for now, it's bothering -->
      <div class="dot"></div>
    </div>
  </div>
</template>

<style scoped>
.dot {
  --dot-radius: .5rem;
  width: var(--dot-radius);
  height: var(--dot-radius);
  aspect-ratio: 1 / 1;
  border-radius: calc(var(--dot-radius) / 2);
  background: #fff;
  box-shadow: 0 0 .5rem #fff;
}
.bait {
  --dot-radius: 8rem;
  width: var(--dot-radius);
  height: var(--dot-radius);
  aspect-ratio: 1 / 1;
  border-radius: calc(var(--dot-radius) / 2);
  border: .75rem solid #ff1717;
  box-shadow: 0 0 0 .25rem #630707,
    inset 0 0 0 .25rem #630707,
    0 0 .5rem .5rem #6307077f;
}
</style>