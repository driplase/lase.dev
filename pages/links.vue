<script setup>
import linksData from '@/data/links'
import HeadTemplate from '~/components/headTemplate.vue';

useSeoMeta({
  robots: "noindex, nofollow"
})
</script>
<template>
  <HeadTemplate :title="$t('links')" />

  <div class="items-start text-start w-full">
    <section class="default">
      
      <h1 class="flash woosh font-bold origin-left">{{ $t('links') }}</h1>

      <h2 class="flash woosh font-bold origin-left" id="socials">{{ $t('socials') }}</h2>
      <div class="socials grid grid-cols-2 max-[320px]:grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-4">
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://youtube.com/@driplase" target="_blank" rel="noopener noreferrer">
            YouTube
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://x.com/driplase" target="_blank" rel="noopener noreferrer">
            <i class="eclyera inline-block icon">
              &#x1d54f;</i> {{ $t('socials.x') }}
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://bsky.app/profile/lase.dev" target="_blank" rel="noopener noreferrer">
            Bluesky
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://misskey.04.si/@driplase" target="_blank" rel="noopener noreferrer">
            Misskey
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://duolingo.com/profile/driplase" target="_blank" rel="noopener noreferrer">
            Duolingo
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://github.com/driplase" target="_blank" rel="noopener noreferrer">
            GitHub
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.instagram.com/driplase" target="_blank" rel="me noopener noreferrer">
            Instagram
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://driplase.newgrounds.com/" target="_blank" rel="noopener noreferrer">
            Newgrounds
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.pixiv.net/users/95047153" target="_blank" rel="noopener noreferrer">
            pixiv
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.reddit.com/user/Driplase/" target="_blank" rel="noopener noreferrer">
            Reddit
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.threads.com/@driplase" target="_blank" rel="me noopener noreferrer">
            Threads
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.tiktok.com/@driplase" target="_blank" rel="noopener noreferrer">
            TikTok
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://driplase.tumblr.com" target="_blank" rel="noopener noreferrer">
            Tumblr
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://www.twitch.tv/driplase" target="_blank" rel="noopener noreferrer">
            Twitch
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://soundcloud.com/driplase" target="_blank" rel="noopener noreferrer">
            SoundCloud
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="https://steamcommunity.com/id/driplase/" target="_blank" rel="noopener noreferrer">
            Steam
          </NuxtLink>
        </p>
        <p class="wiggle woosh wg-text wsh-text flash links">
          <NuxtLink href="http://discord.com/users/959034815766728714" target="_blank" rel="noopener noreferrer">
            Discord <small class="monospace opacity-64">@driplase</small>
          </NuxtLink>
        </p>
      </div>
      
      <h2 class="flash woosh font-bold origin-left" id="reciprocal">{{ $t('mutual_links') }}</h2>
      <div class="socials">
        <p 
          v-for="link in linksData.reciprocal.sort((a, b) => a.title.localeCompare(b.title))"
          class="wiggle woosh wg-text wsh-text flash links"
        >
          <NuxtLink class="" :href="link.url" target="_blank" rel="noopener">
            <!-- <i class="eclyera icon">&#xf806;</i> -->
            <NuxtImg
              v-if="link.imageURL"
              class="link-header"
              :src="link.imageURL" 
              :alt="link.title"
              decoding="async"
              draggable="false"
            />
            <span v-else>
              {{ link.title }}
              <Icon
                name="tabler:external-link" 
                class="icon"
              />
            </span>
          </NuxtLink>
        </p>

        <small class="opacity-72 whitespace-pre-wrap text-xs mb-1">{{ $t('links.mutual.desc') }}</small>
      </div>

      <h2 class="flash woosh font-bold origin-left" id="others">{{ $t('links.others') }}</h2>
      <div class="socials">
        <small class="opacity-72 whitespace-pre text-xs mb-1">{{ $t('links.others.desc') }}</small>
        
        <p 
          v-for="(link, idx) in linksData.others"
          class="wiggle woosh wg-text wsh-text flash links"
          :key="idx"
        >
          <NuxtLink :href="link.url" target="_blank" rel="noopener noreferrer">
            <!-- <i class="eclyera icon">&#xf806;</i> -->
            <NuxtImg
              v-if="link.imageURL"
              class="link-header"
              :src="link.imageURL" 
              :alt="link.title"
              decoding="async"
              draggable="false"
            />

            <span v-else>
              {{ link.title }}
              <Icon
                name="tabler:external-link" 
                class="icon"
              />
            </span>

            <p v-if="link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description` || link.description">
              <small class="text-gray-400 text-sm">
                {{ link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description` ? $t(`links.items.${link.id}.description`) : link.description }}
              </small>
            </p>
          </NuxtLink>
        </p>
      </div>
      
    </section>
  </div>
</template>
<style scoped>
.socials {
  display: grid;
  justify-items: start;

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
  width: 290px;
  /* height: 96px; */
  border-radius: 8px;
}

.zen-maru-gothic {
  font-family: "Zen Maru Gothic", sans-serif;
}
</style>