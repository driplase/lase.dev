<script setup lang="ts">
useHead({
  bodyAttrs: {
    //class: 'no-cursor-page'
  }
})

import ToggleSwitch from '~/components/toggleSwitch.vue'

const mousePos = ref<{
  x: number, y: number,
}>({
  x: 0, y: 0
})
const cursorPos = ref<{
  x: number,
  y: number,
  rotation: number,
}>({
  x: 0, y: 0, rotation: 0,
})

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
  if (htmlElement.matches('input, select, option, label')) return 'pointer'
  if (htmlElement.matches('svg, canvas')) return 'default'
  return undefined
}

const isPointOnText = (x: number, y: number) => {
  const range = (document as any).caretRangeFromPoint?.(x, y)
    || (document as any).caretPositionFromPoint?.(x, y) && (() => {
      const pos = (document as any).caretPositionFromPoint(x, y)
      if (!pos) return null
      const r = document.createRange()
      r.setStart(pos.offsetNode, pos.offset)
      r.setEnd(pos.offsetNode, pos.offset)
      return r
    })()

  if (!range) return false
  const node = range.startContainer
  return node?.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0
}

// EXPERIMENTAL: enable precise text-node detection (may be flaky on some browsers)
const experimentalTextDetection = ref(false)

// Reactive store for the bounding rect of the exact text node under the pointer
const textBoundingRect = ref<DOMRect | null>(null)

const computeTextBoundingRect = (x: number, y: number): DOMRect | null => {
  const range = (document as any).caretRangeFromPoint?.(x, y)
    || (() => {
      const pos = (document as any).caretPositionFromPoint?.(x, y)
      if (!pos) return null
      const r = document.createRange()
      r.setStart(pos.offsetNode, pos.offset)
      r.setEnd(pos.offsetNode, pos.offset)
      return r
    })()

  if (!range) return null
  const node = range.startContainer
  if (node?.nodeType !== Node.TEXT_NODE) return null

  const textNode = node as Text
  const fullRange = document.createRange()
  try {
    fullRange.setStart(textNode, 0)
    fullRange.setEnd(textNode, textNode.length)
    const rect = fullRange.getBoundingClientRect()
    return rect && rect.width > 0 && rect.height > 0 ? rect : null
  } catch (e) {
    return null
  }
}

const updateHoverCursor = (x: number, y: number) => {
  const element = document.elementFromPoint(x, y)
  if (!element) {
    cursorImage.value = defaultCursorImage
    return
  }

  const computedCursor = window.getComputedStyle(element).cursor || 'default'
  let cursorKey = normalizeCursor(computedCursor)

  // If computed style suggested a text cursor, ensure the pointer is actually over text
  if (cursorKey === 'text') {
    const htmlElement = element as HTMLElement
    const isFormText = htmlElement.matches('textarea, input[type=text], input[type=search], input[type=url], input[type=tel], input[type=email], input[type=password], [role="textbox"]')
    if (!isFormText && experimentalTextDetection.value && !isPointOnText(x, y) && !htmlElement.isContentEditable) {
      cursorKey = 'default'
    }
  }

  if (cursorKey === 'default') {
    const semantic = getSemanticCursor(element)
    if (semantic) {
      if (semantic === 'text') {
        const htmlElement = element as HTMLElement
        const isFormText = htmlElement.matches('textarea, input[type=text], input[type=search], input[type=url], input[type=tel], input[type=email], input[type=password], [role="textbox"]')
        if (isFormText || htmlElement.isContentEditable || (experimentalTextDetection.value && isPointOnText(x, y))) {
          cursorKey = 'text'
        }
      } else {
        cursorKey = semantic
      }
    } else if (experimentalTextDetection.value && isPointOnText(x, y)) {
      // final fallback: only treat as text when an actual text node is under the pointer
      cursorKey = 'text'
    }
  }

  currentCursorKey.value = cursorKey
  cursorImage.value = cursorImages[cursorKey] ?? defaultCursorImage

  // update text bounding rect when hovering actual text (only when experimental detection enabled)
  if (cursorKey === 'text' && experimentalTextDetection.value) {
    textBoundingRect.value = computeTextBoundingRect(x, y)
  } else {
    textBoundingRect.value = null
  }
}

onMounted(() => {
  window.addEventListener('mousemove', event => {
    mousePos.value = {
      x: event.clientX,
      y: event.clientY,
    };
    updateHoverCursor(event.clientX, event.clientY)
  })

  let currentTime: number = 0;
  let previousCursorState = cursorPos.value;
  const cursorMovement = {
    x: cursorPos.value.x - previousCursorState.x,
    y: cursorPos.value.y - previousCursorState.y,
  };
  const velocity = { x: 0, y: 0 }

  const animateCursor = (timestamp: number) => {
    const delta = timestamp - currentTime;
    const baseTime = 30; // wtf is baseTime bruh

    cursorMovement.x += cursorPos.value.x - previousCursorState.x;
    cursorMovement.y += cursorPos.value.y - previousCursorState.y;
    
    previousCursorState = { ...cursorPos.value };

    velocity.x = (mousePos.value.x - cursorPos.value.x) / 3.5 * delta / baseTime
    velocity.y = (mousePos.value.y - cursorPos.value.y) / 3.5 * delta / baseTime

    cursorPos.value.x += velocity.x
    cursorPos.value.y += velocity.y
    cursorPos.value.rotation = (cursorMovement.x + cursorMovement.y)

    cursorMovement.x -= cursorMovement.x / 2 * delta / baseTime;
    cursorMovement.y -= cursorMovement.y / 1 * delta / baseTime;
    
    currentTime = timestamp;
    window.requestAnimationFrame(animateCursor)
  }
  window.requestAnimationFrame(animateCursor)
})
</script>

<template>
  <div class="cursed-cursor-controls">
    <label class="control-label">
      Experimental text detect
      <ToggleSwitch v-model="experimentalTextDetection" />
    </label>
  </div>

  <!-- cursor element -->
  <div class="cursor" :style="{
    transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) rotate(${cursorPos.rotation}deg)`,
  }">
    <img class="cursor-image" :src="cursorImage" :style="{
      transform: `translate(${-getOffsetForKey(currentCursorKey).x}px, ${-getOffsetForKey(currentCursorKey).y}px)`
    }" />
  </div>
  
  <p>
    The simplest implementation I only wanted to implement can be found at <NuxtLink to="/miscellaneous/cursed-cursor" class="wiggle woosh flash">https://lase.dev/miscellaneous/cursed-cursor</NuxtLink>
  </p>
  <p>
    this subpage is an expansion of my implementation. mostly used ai.
  </p>
</template>

<style scoped>
.cursor {
  position: fixed;
  z-index: 2147483648;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
  transform-origin: top left;
}

.cursed-cursor-controls {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 2147483650;
  display: flex;
  align-items: center;
  gap: .5rem;
  pointer-events: auto;
  background: rgba(0,0,0,0.36);
  padding: .4rem .6rem;
  border-radius: .4rem;
}
.cursed-cursor-controls .control-label {
  color: white;
  font-size: .9rem;
}
</style>