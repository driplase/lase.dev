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
  scale: [1.05, 1.2],
} : {
  scale: [1.1, 1.5],
})

onMounted(() => {
  const el = root.value
  if (!el || props.disabled) return

  const tl = gsap.timeline()

  const animate = () => {
    tl.clear()
    tl.set(el, {
      scale: gsap.utils.random(settings.value.scale[0], settings.value.scale[1]),
    })
    tl.to(el, {
      ease: 'elastic.out',
      scale: 1,
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
