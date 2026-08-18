<script setup lang="ts">
import { gsap } from 'gsap'

const props = withDefaults(defineProps<{
  as?: string
  text?: boolean
  disabled?: boolean
}>(), {
  as: 'span',
  text: false,
  disabled: false,
})

const root = ref<HTMLElement | null>(null)

const settings = computed(() => props.text ? {
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
})

onMounted(() => {
  const el = root.value
  if (!el || props.disabled) return

  const tl = gsap.timeline()

  const animate = () => {
    tl.clear()
    tl.set(el, {
      skewX: gsap.utils.random(-settings.value.skewX, settings.value.skewX),
      skewY: gsap.utils.random(-settings.value.skewY, settings.value.skewY),
      rotateX: gsap.utils.random(-settings.value.rotateX, settings.value.rotateX),
      rotateY: gsap.utils.random(-settings.value.rotateY, settings.value.rotateY),
      rotateZ: gsap.utils.random(-settings.value.rotateZ, settings.value.rotateZ),
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
