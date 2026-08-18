<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(defineProps<{
  as?: string
  disabled?: boolean
}>(), {
  as: 'span',
  disabled: false,
})

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = root.value
  if (!el || props.disabled) return

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

  el.addEventListener('mouseenter', animate)
  el.addEventListener('click', animate)

  onBeforeUnmount(() => {
    el.removeEventListener('mouseenter', animate)
    el.removeEventListener('click', animate)
    tl.kill()
  })
})
</script>

<template>
  <component :is="as" ref="root" v-bind="$attrs">
    <slot />
  </component>
</template>
