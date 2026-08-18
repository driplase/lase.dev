<script setup>
import linksData from '@/data/links'
import HeadTemplate from '~/components/headTemplate.vue';
import LinkTomb from '~/components/LinkTomb.vue';

// useSeoMeta({
//   robots: "noindex, nofollow"
// })
</script>
<template>
  <HeadTemplate :title="$t('links')" />

  <div class="items-start text-start w-full">
    <section class="default">
      
      <EffectWrapper as="h1" flash woosh class="font-bold origin-left">{{ $t('links') }}</EffectWrapper>

      <EffectWrapper as="h2" flash woosh class="font-bold origin-left" id="socials">{{ $t('socials') }}</EffectWrapper>
      <div class="socials grid grid-cols-2 max-[320px]:grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-4">
        <EffectWrapper v-for="(link, idx) in [
          { label: 'Bluesky', href: 'https://bsky.app/profile/lase.dev' },
          { label: 'BOOTH', href: 'https://driplase.booth.pm' },
          { label: 'Chess.com', href: 'https://www.chess.com/member/driplase' },
          { label: 'Discord', href: 'http://discord.com/users/959034815766728714' },
          { label: 'Duolingo', href: 'https://duolingo.com/profile/driplase' },
          { label: 'GitHub', href: 'https://github.com/driplase' },
          { label: 'Instagram', href: 'https://www.instagram.com/driplase' },
          { label: 'Newgrounds', href: 'https://driplase.newgrounds.com/' },
          { label: 'pixiv', href: 'https://www.pixiv.net/users/95047153' },
          { label: 'Reddit', href: 'https://www.reddit.com/user/Driplase/' },
          { label: 'Scratch', href: 'https://scratch.mit.edu/users/Driplase' },
          { label: 'Scratch JP', href: 'http://scratchjp.org/user/959034815766728714' },
          { label: 'SoundCloud', href: 'https://soundcloud.com/driplase' },
          { label: 'Steam', href: 'https://steamcommunity.com/id/driplase/' },
          { label: 'Threads', href: 'https://www.threads.com/@driplase' },
          { label: 'TikTok', href: 'https://www.tiktok.com/@driplase' },
          { label: 'Tumblr', href: 'https://driplase.tumblr.com' },
          { label: 'Twitch', href: 'https://www.twitch.tv/driplase' },
          { label: $t('socials.x'), href: 'https://x.com/driplase' },
        ]" :key="idx" as="div" wiggle woosh flash text class="links">
          <NuxtLink :href="link.href" target="_blank" rel="noopener noreferrer">
            <template v-if="link.label === $t('socials.x')">
              <i class="eclyera inline-block icon">&#x1d54f;</i> {{ $t('socials.x') }}
            </template>
            <template v-else>
              {{ link.label }}
            </template>
          </NuxtLink>
        </EffectWrapper>
        <EffectWrapper as="div" wiggle woosh flash text class="links pointer-events-none cursor-not-allowed text-gray-400! line-through">
          <NuxtLink href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400! line-through">
            YouTube
          </NuxtLink>
        </EffectWrapper>
      </div>
      <EffectWrapper as="h3" id="fediverse" flash woosh class="font-bold origin-left">Fediverse</EffectWrapper>
      <div class="socials grid grid-cols-2 max-[320px]:grid-cols-1 min-[480px]:grid-cols-3 sm:grid-cols-4">
        <EffectWrapper v-for="(link, idx) in [
          { label: 'りんごぱい (misskey.04.si)', href: 'https://misskey.04.si/@Driplase' },
          { label: 'Misskey.io', href: 'https://misskey.io/@Driplase' },
          { label: 'Misskey.gg', href: 'https://misskey.gg/@driplase' },
          { label: 'みかんぱい (calc.04.si)', href: 'https://calc.04.si/@driplase' },
        ]" :key="idx" as="div" wiggle woosh flash text class="links">
          <NuxtLink :href="link.href" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </NuxtLink>
        </EffectWrapper>
      </div>
      
      <EffectWrapper as="h2" flash woosh class="font-bold origin-left" id="reciprocal">{{ $t('mutual_links') }}</EffectWrapper>
      <div class="socials">
        <EffectWrapper
          v-for="(link, idx) in linksData.reciprocal.sort((a, b) => a.title.localeCompare(b.title))"
          :key="link.id || idx"
          as="div"
          wiggle
          woosh
          flash
          text
          class="links"
        >
          <component :is="link.dead ? LinkTomb : 'div'" :link="link">
            <NuxtLink class="" :href="link.dead ? '#' : link.url" target="_blank" rel="noopener">
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
              <small
                v-if="(link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description`) || link.description"
                class="text-gray-400 text-sm block"
              >
                {{ link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description` ? $t(`links.items.${link.id}.description`) : link.description }}
              </small>
            </NuxtLink>
          </component>
        </EffectWrapper>

        <small class="opacity-72 whitespace-pre-wrap text-xs mb-1">{{ $t('links.mutual.desc') }}</small>
      </div>

      <EffectWrapper as="h2" flash woosh class="font-bold origin-left" id="others">{{ $t('links.others') }}</EffectWrapper>
      <div class="socials">
        <small class="opacity-72 whitespace-pre text-xs mb-1">{{ $t('links.others.desc') }}</small>
        
        <EffectWrapper
          v-for="(link, idx) in linksData.others"
          :key="link.id || idx"
          as="div"
          wiggle
          woosh
          flash
          text
          class="links"
        >
          <component :is="link.dead ? LinkTomb : 'div'">
            <NuxtLink class="" :href="link.dead ? '#' : link.url" target="_blank" rel="noopener">
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

              <small
                v-if="(link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description`) || link.description"
                class="text-gray-400 text-sm block"
              >
                {{ link.id && $t(`links.items.${link.id}.description`) !== `links.items.${link.id}.description` ? $t(`links.items.${link.id}.description`) : link.description }}
              </small>
            </NuxtLink>
          </component>
        </EffectWrapper>

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

.zen-maru-gothic {
  font-family: "Zen Maru Gothic", sans-serif;
}
</style>