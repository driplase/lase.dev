<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(defineProps<{
  as?: string
  wiggle?: boolean
  woosh?: boolean
  flash?: boolean
  text?: boolean
  disabled?: boolean
}>(), {
  as: 'span',
  wiggle: false,
  woosh: false,
  flash: false,
  text: false,
  disabled: false,
})

const root = ref<HTMLElement | null>(null)

const addInteraction = (el: HTMLElement, animate: () => void) => {
  el.addEventListener('mouseenter', animate)
  el.addEventListener('click', animate)
  return () => {
    el.removeEventListener('mouseenter', animate)
    el.removeEventListener('click', animate)
  }
}

onMounted(() => {
  const el = root.value
  if (!el || props.disabled) return

  const cleanup: Array<() => void> = []

  if (props.wiggle) {
    const settings = props.text ? {
      skewX: 1,
      skewY: 2,
      rotateX: 1.7,
      rotateY: 1.5,
      rotateZ: 3.2,
    } : {
      skewX: 2,
      skewY: 10,
      rotateX: 5,
      rotateY: 8,
      rotateZ: 10,
    }

    const tl = gsap.timeline()
    const animate = () => {
      tl.clear()
      tl.set(el, {
        skewX: gsap.utils.random(-settings.skewX, settings.skewX),
        skewY: gsap.utils.random(-settings.skewY, settings.skewY),
        rotateX: gsap.utils.random(-settings.rotateX, settings.rotateX),
        rotateY: gsap.utils.random(-settings.rotateY, settings.rotateY),
        rotateZ: gsap.utils.random(-settings.rotateZ, settings.rotateZ),
      })
      tl.to(el, {
        ease: 'elastic.out',
        skewX: 0,
        skewY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 1,
      })
      tl.to(el, {
        ease: 'expo.out',
        duration: 1,
      })
    }

    cleanup.push(addInteraction(el, animate))
    cleanup.push(() => tl.kill())
  }

  if (props.woosh) {
    const settings = props.text ? [1.05, 1.2] : [1.1, 1.5]
    const tl = gsap.timeline()
    const animate = () => {
      tl.clear()
      tl.set(el, {
        scale: gsap.utils.random(settings[0], settings[1]),
      })
      tl.to(el, {
        ease: 'elastic.out',
        scale: 1,
        duration: 1,
      })
    }

    cleanup.push(addInteraction(el, animate))
    cleanup.push(() => tl.kill())
  }

  if (props.flash) {
    const tl = gsap.timeline({ paused: true })

    tl.set(el, {
      textShadow: '0 0 16px var(--effect-shadow-color)',
      filter: 'brightness(1.5)',
    })

    tl.to(el, {
      ease: 'expo.out',
      textShadow: '0 0 5px var(--effect-shadow-color)',
      filter: 'brightness(1)',
      duration: 0.7,
    })

    const animate = () => {
      tl.restart()
    }

    cleanup.push(addInteraction(el, animate))
    cleanup.push(() => tl.kill())
  }

  onBeforeUnmount(() => {
    cleanup.forEach((fn) => fn())
  })
})
</script>

<template>
  <component :is="as" ref="root" v-bind="$attrs">
    <slot />
  </component>
</template>
