<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('home')" :description="$t('home.description')" align="center">

    <section class="default beginning flex flex-row justify-center items-center gap-12 h-96">

      <div class="logo">
        <NuxtImg 
          class="invert logo-img" 
          src="/assets/logo/d_256x256.webp" 
          draggable="false" 
          alt="driplase logo"
          fetchpriority="high"
        />
        <NuxtImg 
          class="logo-img logo-shadow" 
          src="/assets/logo/d_256x256.webp" 
          draggable="false" 
          alt="driplase logo"
        />
      </div>

      <div class="flex h-full items-center">
        <div class="block text-left">
  
          <h2 class="mb-2"><span class="text-5xl text-glow">driplase</span></h2>
          <p class="text-gray-400 text-sm italic font-mono">hobbyist, </p>
        
        </div>
      </div>

    </section>

    <hr class="text-gray-400 shadow-gray-400 glow-line" />

    <section class="default">

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
  user-select: none;
  pointer-events: none;
}

</style>