<script setup>
import { gsap } from "gsap";

const route = useRoute();

// debug
const debug = ""

const isFromSpacer = ref(false)

function fromSpacer() {
  let tl = gsap.timeline();

  tl.set('.from-spacer.logo', {
    opacity: 0,
    scale: 0,
    y: "50vh",
    rotateZ: -180,
    filter: "blur(4vmin)",
  }, 0)

  tl.set('.from-spacer-bg', {
    filter: "brightness(1)",
  })

  tl.set('.from-spacer.logo-glow', {
    scale: 0,
  })

  tl.set('.from-spacer.after-lase-dev', {
    scale: .5,
    filter: 'blur(1.5vmin)',
    opacity: 0,
  })


  tl.to('.from-spacer.letter-box', {
    height: "8vh",

    ease: "power3.out",
    duration: .6,
  }, 0)
  tl.to('.from-spacer.letter-box', {
    height: "18vh",

    ease: "power2.in",
    duration: .3,
  }, .3)
  tl.to('.from-spacer.letter-box', {
    height: "12vh",

    ease: "elastic.out(1, .36)",
    duration: 1.5,
  }, .6)

  tl.to('.from-spacer.logo', {
    opacity: 1,
    scale: 1,
    filter: "blur(0vmin)",

    ease: "power3.out",
    duration: 1,
  }, 0.05)

  tl.to('.from-spacer.logo', {
    y: 0,
    
    ease: "back.out(.64)",
    duration: .8,
  }, 0.05)

  tl.to('.from-spacer.logo', {
    rotateZ: 0,
    
    ease: "elastic.out(.64, 0.3)",
    duration: 1,
  }, 0.05)

  tl.to('.from-spacer.zoomer', {
    scale: 1.5,
    filter: "blur(.5vmin)",

    ease: "expo.in",
    duration: .45,
  }, .15)
  tl.to('.from-spacer.zoomer', {
    filter: "blur(0vmin)",

    ease: "expo.out",
    duration: .8,
  }, .6)
  tl.to('.from-spacer.zoomer', {
    scale: 1,

    ease: "elastic.out(.7, 0.64)",
    duration: 1.2,
  }, .6)


  tl.to('.from-spacer-bg', {
    filter: "brightness(.7)",

    ease: "power3.inout",
    duration: .45
  }, .15)
  tl.to('.from-spacer-bg', {
    filter: "brightness(1.4)",

    ease: "power4.in",
    duration: .45
  }, .15)
  tl.to('.from-spacer-bg', {
    filter: "brightness(1)",

    ease: "back.out(1.5)",
    duration: .64,
  }, .6)

  tl.to('.from-spacer.logo-glow', {
    opacity: .5,
    scale: 1,

    ease: "power3.in",
    duration: .45
  }, .15)
  tl.to('.from-spacer.logo-glow', {
    scale: .8,

    ease: "elastic.out(1.2, .4)",
    duration: 1.5,
  }, .6)
  tl.to('.from-spacer.logo-glow', {
    opacity: 0,

    ease: "bounce.out",
    duration: .8,
  }, .6)

  tl.to('.from-spacer.logos', {
    opacity: 0,
    scale: .5,
    filter: "blur(1.5vmin)",

    ease: "power3.in",
    duration: 1
  }, .25)
  
  tl.to('.from-spacer.vignette', {
    opacity: 0,

    ease: "power3.in",
    duration: 1.25
  }, .6)
  
  tl.to('.from-spacer.after-lase-dev', {
    opacity: 1,
    scale: 1,
    filter: "blur(0vmin)",
    
    ease: "power3.out",
    duration: 2,
  }, 1)
  
  tl.to('.from-spacer.after-lase-dev', {
    letterSpacing: "3vmin",
    paddingLeft: "3vmin",
    
    ease: "power4.out",
    duration: 5,
  }, 1)
  
  tl.to('.from-spacer.after-lase-dev', {
    opacity: 0,
    scale: .5,
    filter: "blur(1.5vmin)",
    
    ease: "power3.in",
    duration: 1
  }, 2)
  
  tl.to('.from-spacer.bg-transition', {
    "--bg-size": "100%",

    ease: "power4.in",
    duration: 1,
  }, 2)

  tl.to('.from-spacer.letter-box', {
    height: "0vh",

    ease: "power4.in",
    duration: 1,
  }, 2)
  
  tl.to('.from-spacer.parent', {
    opacity: 0,
    pointerEvents: "none",

    ease: "power2.inout",
    duration: 1,
  }, 3)

  tl.play()
  
  document.querySelector('.from-spacer.parent').addEventListener('click', event => {
    let tl2 = gsap.timeline();

    tl2.to('.from-spacer.logos', {
      opacity: 0,
      scale: .5,
      filter: "blur(1.5vmin)",

      ease: "power3.in",
      duration: 1
    }, 0)
    
    tl2.to('.from-spacer.after-lase-dev', {
      opacity: 0,
      scale: .5,
      filter: "blur(1.5vmin)",
      
      ease: "power3.in",
      duration: .5
    }, 0)

    tl2.to('.from-spacer.bg-transition', {
      "--bg-size": "100%",

      ease: "power4.in",
      duration: .5,
    }, 0)

    tl2.to('.from-spacer.letter-box', {
      height: "0vh",

      ease: "power4.in",
      duration: .5,
    }, 0)
    
    tl2.to('.from-spacer.parent', {
      opacity: 0,
      pointerEvents: "none",

      ease: "power2.inout",
      duration: 1,
    }, .5)

    tl2.play()
  })
} 

onMounted(async () => {
  const referrer = document.referrer ? new URL(document.referrer) : null

  if (
    referrer?.host === "spacer4719.f5.si" ||
    route.query?.utm_source === "spacer4719" || 
    debug === "spacer"
  ) {
    isFromSpacer.value = true
    await nextTick();
    fromSpacer();
  }
})
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

    <div v-if="isFromSpacer" class="from-spacer parent fixed inset-0 z-150 pointer-events-none flex justify-center items-center backdrop-blur-sm">
      <div class="from-spacer-bg absolute inset-0 bg-[#002451]">
        <!-- letter boxes -->
        <div class="from-spacer letter-box absolute top-0 w-full h-0 z-5 bg-black"></div>
        <div class="from-spacer letter-box absolute bottom-0 w-full h-0 z-5 bg-black"></div>
        <!-- vignett? -->
        <div class="from-spacer vignette"></div>

        <!-- background transition -->
        <div class="from-spacer bg-transition absolute inset-0">
          <div class="from-spacer bg-transition-back"></div>
        </div>
      </div>

      <div class="logo from-spacer">
        <div class="from-spacer zoomer">
          <div class="from-spacer logos">

            <NuxtImg 
              class="invert logo-img" 
              src="/assets/d_256x256.png" 
              draggable="false" 
              alt="driplase logo"
            />
            <NuxtImg 
              class="logo-img logo-shadow" 
              src="/assets/d_256x256.png" 
              draggable="false" 
              alt="driplase logo"
            />
  
            <div class="from-spacer logo-glow glow-1"></div>
            <div class="from-spacer logo-glow glow-2"></div>

          </div>

          <div class="from-spacer after-lase-dev absolute inset-0 grid justify-center items-center font-mono italic text-[8vmin] text-shadow-[0_0_1.325vmin_rgb(255,255,255)]">
            lase.dev
          </div>

        </div>
      </div>
    </div>

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

/* .from-spacer */
.from-spacer {
  pointer-events: none;
}
.from-spacer.parent {
  pointer-events: auto;
}

.from-spacer.vignette {
  position: absolute;
  inset: 0;
  z-index: 1;

  background: radial-gradient(circle,
    transparent 00%,
    color-mix(in srgb, #00f7ff55, transparent 60%) 100%)
}

.from-spacer.logo-img {
  position: relative;
  z-index: 5;
}

.from-spacer.logo-glow {
  position: absolute;
  opacity: 0; /* max: .5 */
  background: radial-gradient(circle,
      rgba(255, 255, 255, 1) 0%, transparent 72%);
  filter: blur(1vmin);
  mix-blend-mode: plus-lighter;

  &.glow-1 {
    inset: -4vmin;
    z-index: 1;
  }
  &.glow-2 {
    inset: -2vmin;
    z-index: 2; 
  }
}

.from-spacer.bg-transition {
  --bg-size: 0%;

  width: 100%;
  height: 100%;
  background: radial-gradient(circle,
    var(--color-background) 0%, 
    color-mix(in srgb, var(--color-background), transparent calc(100% - var(--bg-size))) var(--bg-size));
}
</style>