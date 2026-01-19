<script setup lang="ts">
import { gsap } from "gsap";

const rrPlayer = ref();
const isPlaying = ref<boolean>(false);
const rickrolled = ref<boolean>(false);

useSeoMeta({
  robots: "noindex, nofollow"
})

async function initializeRickRoll() {
	if (rickrolled.value) return;

  const playRickRoll = setInterval(async () => {
    if (!rrPlayer.value?.player) return;
    
    try {
      await rrPlayer.value.player.playVideo();
    } catch (e) {
      console.error('Failed to play video:', e);
    }

    if (isPlaying.value) {
      clearInterval(playRickRoll);
      releaseRickRollJumpscare();
    }
  }, 50);

}

async function releaseRickRollJumpscare() {
	try {
	  document.documentElement.requestFullscreen();
  } catch {}

  useHead({
    title: "You've been RICKROLLED!!!!! - lase.dev"
  })

  const tl = gsap.timeline();

  tl.set('header', {
    y: 0
  }, 0);
  tl.set('.yt-embed', {
    display: "block",
  }, 0);
  tl.set('.interaction-blocker', {
    cursor: "none",
  }, 18)
  tl.to('header', {
    y: -54,
    duration: .6,
    ease: "power3.out"
  }, 0.16);

  tl.to('header', {
    y: 0,
    duration: 1.25,
    ease: "power4.inout"
  }, 18);
  tl.to('.screen-cover', {
    position: "static",
    width: 560,
    height: 315,
    duration: 1,
    ease: "expo.out"
  }, 18);
  tl.set('.interaction-blocker', {
    display: "none",
    cursor: "auto",
  }, 18)

  tl.play();

  rickrolled.value = true;

  setTimeout(() => document.exitFullscreen(), 18_000)

}

function stateChange(event: any) {
  isPlaying.value = event.data === 1;

  if (!rickrolled.value && event.data === 1) {
		releaseRickRollJumpscare()
  }
}

function onReady() {
	initializeRickRoll();
}

onMounted(() => {
  window.addEventListener("touchstart", () => initializeRickRoll());
   window.addEventListener("click", () => initializeRickRoll());
})
</script>

<template>
  <article class="blog">

    <section class="title-section">
      <h1 class="title" v-if="!rickrolled">{{ $t('misc.ttsol.title') }}</h1>
      <small class="text-sm text-gray-400" v-if="!rickrolled">{{ $t('misc.ttsol.description') }}</small>

      
      <h1 class="title" v-if="rickrolled">You've been RICKROLLED!!!!!!!!!!!</h1>
      <small class="text-sm text-gray-400" v-if="rickrolled">You've been RICKROLLED!!!!!!!!!!!</small>
    </section>
    
    <hr />
    
    <section class="main-section">
      <p v-if="!rickrolled">{{ $t('misc.ttsol.please_click') }}</p>
      <p v-if="rickrolled">You've been RICKROLLED!!!!!!!!!!!</p>
    </section>

    <div class="screen-cover">
      <ScriptYouTubePlayer
        video-id="dQw4w9WgXcQ"
        ref="rrPlayer"
        trigger="onNuxtReady"
        class="yt-embed"
        :width="560"
        :height="315"
        :player-options="{ 
          playerVars: { 
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
          } 
        }"
        @ready="onReady"
        @state-change="stateChange"
      />

      <div class="interaction-blocker"></div>
    </div>

  </article>
</template>

<style>
#__nuxt {
  overflow: hidden;
}
</style>

<style scoped>
.screen-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0; 
  left: 0;
  z-index: 64;
  overflow: hidden;
}

.yt-embed {
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}

.interaction-blocker {
  width: 100%;
  height: 100%;
  pointer-events: all;
  user-select: none;
  position: fixed;
  inset: 0;
  z-index: 10000;
}

/* Ensure proper scaling on mobile */
@media (max-width: 768px) {
  .screen-cover {
    height: 100vh;
  }
  
  .yt-embed {
    object-fit: cover;
  }
}
</style>