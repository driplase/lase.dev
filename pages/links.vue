<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('links')" align="start">
    <h1 class="flash woosh font-bold">{{ $t('socials') }}</h1>
    <div class="socials">
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://youtube.com/@driplase" target="_blank" rel="noopener noreferrer">YouTube</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://x.com/driplase" target="_blank" rel="noopener noreferrer">
          <i class="eclyera icon">&#x1d54f;</i> {{ $t('socials.x') }}
        </NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://github.com/driplase" target="_blank" rel="noopener noreferrer">GitHub</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="#" target="_blank" rel="noopener noreferrer">whatevr it s</NuxtLink>
      </p>
    </div>
    <br>
    <h1 class="flash woosh font-bold">{{ $t('mutual_links') }}</h1>
    <div class="socials">
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://furamen.kokkosoft.com" target="_blank" rel="noopener noreferrer">
          <i class="eclyera icon">&#xf806;</i> ふらめんのホームページ
        </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>
<style scoped>
  .socials {
    display: grid;
    font-size: 1.2rem;
    margin-left: 1.6rem;
  }
  .links {
    padding: 4px;
  }
  a {
    text-decoration: none;
  }
</style>