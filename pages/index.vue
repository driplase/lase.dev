<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('home')" :description="$t('home.description')" align="center">

    <section class="beginning grid justify-center">

      <div class="logo">
        <NuxtImg 
          class="invert logo-img" 
          src="/assets/d_256x256.png" 
          draggable="false" 
          alt="driplase logo"
          fetchpriority="high"
        />
        <NuxtImg 
          class="logo-img logo-shadow" 
          src="/assets/d_256x256.png" 
          draggable="false" 
          alt="driplase logo"
        />
      </div>

    </section>

    <section>

      <h2>Hi! I'm driplase.</h2>
      <p class="text-gray-400 text-sm font-mono">{{ $t('blog.description.wip') }}</p>

    </section>
  </NuxtLayout>
</template>
<style scoped>
section {
  width: 100%;
}

.logo {
  position: relative;

  width: 32vmin;
}

.logo-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
}

.logo-shadow {
  position: absolute;
  inset: 0;

  /* 6px */
  filter: invert(1) blur(1vmin);
}

</style>