<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

useHead({
  bodyAttrs: {
    class: 'no-cursor-page'
  }
})

const route = useRoute();
const speedMultiplier = route.query.speedMultiplier && parseFloat(route.query.speedMultiplier.toString()) || 1

const mousePos = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const cursorPos = ref<{
  x: number,
  y: number,
  rotation: number,
  show: boolean,
} | null>(null)

const cursorImages = {
  default: '/assets/images/cursed-cursors/v2/default.png',
  pointer: '/assets/images/cursed-cursors/v2/pointer.png',
  text: '/assets/images/cursed-cursors/v2/text.png',
  grab: '/assets/images/cursed-cursors/v2/grab.png',
  grabbing: '/assets/images/cursed-cursors/v2/grabbing.png',
  move: '/assets/images/cursed-cursors/v2/move.png',
  wait: '/assets/images/cursed-cursors/v2/wait.png',
  progress: '/assets/images/cursed-cursors/v2/progress.png',
  help: '/assets/images/cursed-cursors/v2/help.png',
  notAllowed: '/assets/images/cursed-cursors/v2/not-allowed.png',
} as const
const cursorImage = ref<string>(cursorImages.default)

type CursorKey = keyof typeof cursorImages
const defaultCursorImage = cursorImages.default

// Global render offset (useful to center the image over pointer)
const cursorOffset = ref({ x: 0, y: 0 })

// Per-cursor overrides (optional)
const cursorOffsets: Partial<Record<CursorKey, { x: number, y: number }>> = {
  default: { x: 1, y: 1 },
  pointer: { x: 10, y: 3 },
  text: { x: 8, y: 11 },
}

const currentCursorKey = ref<CursorKey>('default')

const getOffsetForKey = (key: CursorKey) => {
  return cursorOffsets[key] ?? cursorOffset.value
}

const normalizeCursor = (cursor: string): CursorKey => {
  const normalized = cursor.toLowerCase()
  if (normalized.includes('pointer')) return 'pointer'
  if (normalized.includes('text') || normalized.includes('vertical-text')) return 'text'
  if (normalized.includes('grab')) return 'grab'
  if (normalized.includes('progress')) return 'progress'
  if (normalized.includes('wait')) return 'wait'
  if (normalized.includes('move')) return 'move'
  if (normalized.includes('help')) return 'help'
  if (normalized.includes('not-allowed') || normalized.includes('no-drop') || normalized.includes('forbidden')) return 'notAllowed'
  return 'default'
}

const getSemanticCursor = (element: Element): CursorKey | undefined => {
  const htmlElement = element as HTMLElement
  if (htmlElement.isContentEditable || htmlElement.closest('[contenteditable="true"]')) return 'text'
  if (htmlElement.matches('textarea, input[type=text], input[type=search], input[type=url], input[type=tel], input[type=email], input[type=password], [role="textbox"]')) return 'text'
  if (htmlElement.matches('a[href], button, [role="button"], [role="link"]')) return 'pointer'
  if (htmlElement.matches('input[type=range]')) return 'grab'
  if (htmlElement.matches('input, select, option')) return 'pointer'
  if (htmlElement.matches('svg, canvas')) return 'default'
  return undefined
}

const updateHoverCursor = (x: number, y: number) => {
  const element = document.elementFromPoint(x, y)
  if (!element) {
    cursorImage.value = defaultCursorImage
    return
  }

  const computedCursor = window.getComputedStyle(element).cursor || 'default'
  let cursorKey = normalizeCursor(computedCursor)

  // No text-node detection: only treat text when element is an actual text input/contenteditable
  if (cursorKey === 'default') {
    const semantic = getSemanticCursor(element)
    if (semantic) {
      cursorKey = semantic
    }
  }

  currentCursorKey.value = cursorKey
  cursorImage.value = cursorImages[cursorKey] ?? defaultCursorImage
}

let rafId = 0
let mouseMoveListener: ((e: MouseEvent) => void) | null = null
let mouseEnterListener: ((e: MouseEvent) => void) | null = null
let mouseLeaveListener: ((e: MouseEvent) => void) | null = null
onMounted(() => {
  mousePos.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
  cursorPos.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    rotation: 0,
    show: true,
  }

  mouseMoveListener = (event: MouseEvent) => {
    mousePos.value = { x: event.clientX, y: event.clientY }
    updateHoverCursor(event.clientX, event.clientY)
  }
  window.addEventListener('mousemove', mouseMoveListener)
  mouseEnterListener = (event: MouseEvent) => {
    if (!cursorPos.value) return;
    
    cursorPos.value = {
      x: event.clientX,
      y: event.clientY,
      rotation: 0,
      show: true,
    }
    previousCursorState = { ...cursorPos.value }
  }
  document.addEventListener('mouseenter', mouseEnterListener)
  mouseLeaveListener = (event: MouseEvent) => {
    if (!cursorPos.value) return;

    cursorPos.value.show = false;
  }
  document.addEventListener('mouseleave', mouseLeaveListener)

  let currentTime = 0
  let previousCursorState = { ...cursorPos.value }
  const cursorMovement = { x: 0, y: 0 }
  const velocity = { x: 0, y: 0 }

  const animateCursor = (timestamp: number) => {
    if (!cursorPos.value) {
      window.requestAnimationFrame(animateCursor);
      return;
    }

    const delta = timestamp - currentTime
    const baseTime = 30 / speedMultiplier

    cursorMovement.x += cursorPos.value.x - previousCursorState.x
    cursorMovement.y += cursorPos.value.y - previousCursorState.y

    previousCursorState = { ...cursorPos.value }

    velocity.x = (mousePos.value.x - cursorPos.value.x) / 3 * delta / baseTime
    velocity.y = (mousePos.value.y - cursorPos.value.y) / 3 * delta / baseTime

    cursorPos.value.x += velocity.x
    cursorPos.value.y += velocity.y
    cursorPos.value.rotation = (cursorMovement.x + cursorMovement.y) * .7

    cursorMovement.x -= cursorMovement.x / 2.5 * delta / baseTime
    cursorMovement.y -= cursorMovement.y / 1.25 * delta / baseTime

    currentTime = timestamp
    rafId = window.requestAnimationFrame(animateCursor)
  }
  rafId = window.requestAnimationFrame(animateCursor)
})

onBeforeUnmount(() => {
  if (mouseMoveListener) window.removeEventListener('mousemove', mouseMoveListener)
  if (rafId) window.cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="cursor" :style="{
    transform: `translate(${cursorPos ? `${cursorPos.x}px` : '50dvw'}, ${cursorPos ? `${cursorPos.y}px` : '50dvh'}) rotate(${cursorPos?.rotation || 0}deg)`,
    opacity: cursorPos?.show ? 1 : 0,
  }">
    <img class="cursor-image" :src="cursorImage" :style="{
      transform: `translate(${-getOffsetForKey(currentCursorKey).x}px, ${-getOffsetForKey(currentCursorKey).y}px)`
    }" />

    <!--
    <div class="cursor-debug font-mono" :style="{
      transform: `rotate(${-(cursorPos?.rotation || 0)}deg)`,
      transformOrigin: 'top left'
    }">
      <div>{{ mousePos }}</div>
      <div>{{ cursorPos }}</div>
    </div>
    -->
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  z-index: 2147483647;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
  transform-origin: top left;
  filter: drop-shadow(3px 3px 2px #0000007d);
}

.cursor-image {
  display: block;
  width: 32px;
  height: 32px;
}
</style>
