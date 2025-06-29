<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('links')" align="start">
    <h1 class="flash woosh font-bold">{{ $t('socials') }}</h1>
    <div class="socials grid grid-cols-2 max-[320px]:grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-4">
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://youtube.com/@driplase" target="_blank" rel="noopener noreferrer">YouTube</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://x.com/driplase" target="_blank" rel="noopener noreferrer">
          <i class="eclyera inline-block icon">&#x1d54f;</i> {{ $t('socials.x') }}
        </NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://github.com/driplase" target="_blank" rel="noopener noreferrer">GitHub</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://www.instagram.com/driplase" target="_blank" rel="me noopener noreferrer">Instagram</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://driplase.newgrounds.com/" target="_blank" rel="noopener noreferrer">Newgrounds</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://www.reddit.com/user/Driplase/" target="_blank" rel="noopener noreferrer">Reddit</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://www.threads.com/@driplase" target="_blank" rel="me noopener noreferrer">Threads</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://www.twitch.tv/driplase" target="_blank" rel="noopener noreferrer">Twitch</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://www.tiktok.com/@driplase" target="_blank" rel="noopener noreferrer">TikTok</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://soundcloud.com/driplase" target="_blank" rel="noopener noreferrer">SoundCloud</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://steamcommunity.com/id/driplase/" target="_blank" rel="noopener noreferrer">Steam</NuxtLink>
      </p>
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="http://discord.com/users/959034815766728714" target="_blank" rel="noopener noreferrer">Discord <small class="monospace opacity-64">@driplase</small></NuxtLink>
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
      <small class="opacity-72 whitespace-pre text-xs">&#xFEFF;{{ $t('links.mutual.desc') }}</small>
    </div>
  </NuxtLayout>
</template>
<style scoped>
  .socials {
    display: grid;
    font-size: 1.2rem;
    margin-left: 1.6rem;

    @media screen and (max-width: 40rem) {
      font-size: 1rem;
    }
  }
  .links {
    padding: 6px;
  }
  a {
    text-decoration: none;
  }
</style>