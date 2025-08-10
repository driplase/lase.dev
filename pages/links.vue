<script setup>
</script>
<template>
  <NuxtLayout name="default" :title="$t('links')" align="start">
    <h1 class="flash woosh font-bold origin-left">{{ $t('links') }}</h1>

    <h2 class="flash woosh font-bold origin-left" id="socials">{{ $t('socials') }}</h2>
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

    <h2 class="flash woosh font-bold origin-left" id="reciprocal">{{ $t('mutual_links') }}</h2>
    <div class="socials">
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://furamen.kokkosoft.com" target="_blank" rel="noopener noreferrer">
          <i class="eclyera icon">&#xf806;</i>
          ふらめんのホームページ
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>

      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://spacer4719.f5.si" target="_blank" rel="noopener noreferrer">
          <img
            class="link-header"
            src="https://spacer4719.f5.si/images/NSH.png" 
            alt="spacer4719's site"
            decoding="async"
            draggable="false"
          />
        </NuxtLink>
      </p>

      
      <small class="opacity-72 whitespace-pre-wrap text-xs mb-1">{{ $t('links.mutual.desc') }}</small>
    </div>

    <h2 class="flash woosh font-bold origin-left" id="others">{{ $t('links.others') }}</h2>
    <div class="socials">
      <small class="opacity-72 whitespace-pre text-xs mb-1">{{ $t('links.others.desc') }}</small>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://github.com/driplase/lase.dev" target="_blank" rel="noopener noreferrer">
          driplase/lase.dev (Source Code)
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
          <Icon
            name="logos:vue" 
            class="icon"
          />
          Vue.js - The Progressive JavaScript Framework
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://nuxt.com" target="_blank" rel="noopener noreferrer">
          <Icon
            name="logos:nuxt-icon" 
            class="icon"
          />
          Nuxt - The Progressive Web Framework
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://gsap.com" target="_blank" rel="noopener noreferrer">
          GSAP - A wildly robust JavaScript animation library
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://scratchjp.notion.site/Scratch-JP-4cf67387576f4fccb9c8a3eb8ca53a0a" target="_blank" rel="noopener noreferrer">
          Scratch JP (Notion)
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://mcscr.jp" target="_blank" rel="noopener noreferrer">
          <img
            class="icon"
            src="https://map.mcscr.jp/logo/64x64.webp"
            decoding="async"
          />
          ScJPMCマイクラ鯖
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://rampo.f5.si" target="_blank" rel="noopener noreferrer">
          <img
            class="link-header"
            src="https://cdn.rampo.f5.si/logo.png" 
            alt="ランポっちのホームページ"
            decoding="async"
            draggable="false"
          />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://kouhei.f5.si" target="_blank" rel="noopener noreferrer">
          Kouheiのホームページ
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>

      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://kokkosoft.com/" target="_blank" rel="noopener noreferrer">
          <i class="eclyera icon">&#xf807;</i>
          KokkoSoft OfficialPage
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>

      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://iseebi.kokkosoft.com/" target="_blank" rel="noopener noreferrer">
          いせえびのホームページ
            <Icon
              name="tabler:external-link" 
              class="icon"
            />
        </NuxtLink>
      </p>
      
      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://j0.si/" target="_blank" rel="noopener noreferrer">
          j0.si
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
        </NuxtLink>
      </p>

      <p class="wiggle woosh wg-text wsh-text flash links">
        <NuxtLink href="https://treron.jp/" target="_blank" rel="noopener noreferrer">
          Treron.jp
          <Icon
            name="tabler:external-link" 
            class="icon"
          />
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

.link-header {
  pointer-events: none;
  height: 96px;
  border-radius: 8px;
}
</style>