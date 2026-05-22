<script setup lang="ts">
useHead({
  bodyAttrs: {
    //class: 'no-cursor-page'
  }
})

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

const cursorImage = ref('https://driplase.github.io/cursor/cursor.svg')
const cursorImages = {
  default: 'https://driplase.github.io/cursor/cursor.svg',
  pointer: 'https://driplase.github.io/cursor/cursor-pointer.svg',
  text: 'https://driplase.github.io/cursor/cursor-text.svg',
  grab: 'https://driplase.github.io/cursor/cursor-grab.svg',
  grabbing: 'https://driplase.github.io/cursor/cursor-grabbing.svg',
  move: 'https://driplase.github.io/cursor/cursor-move.svg',
  wait: 'https://driplase.github.io/cursor/cursor-wait.svg',
  progress: 'https://driplase.github.io/cursor/cursor-progress.svg',
  help: 'https://driplase.github.io/cursor/cursor-help.svg',
  notallowed: 'https://driplase.github.io/cursor/cursor-not-allowed.svg',
} as const

type CursorKey = keyof typeof cursorImages
const defaultCursorImage = cursorImages.default

const normalizeCursor = (cursor: string): CursorKey => {
  const normalized = cursor.toLowerCase()
  if (normalized.includes('pointer')) return 'pointer'
  if (normalized.includes('text') || normalized.includes('vertical-text')) return 'text'
  if (normalized.includes('grab')) return 'grab'
  if (normalized.includes('progress')) return 'progress'
  if (normalized.includes('wait')) return 'wait'
  if (normalized.includes('move')) return 'move'
  if (normalized.includes('help')) return 'help'
  if (normalized.includes('not-allowed') || normalized.includes('no-drop') || normalized.includes('forbidden')) return 'notallowed'
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

const updateHoverCursor = (x: number, y: number) => {
  const element = document.elementFromPoint(x, y)
  if (!element) {
    cursorImage.value = defaultCursorImage
    return
  }

  const computedCursor = window.getComputedStyle(element).cursor || 'default'
  let cursorKey = normalizeCursor(computedCursor)

  if (cursorKey === 'default') {
    const semantic = getSemanticCursor(element)
    if (semantic) {
      cursorKey = semantic
    } else if (isPointOnText(x, y)) {
      cursorKey = 'text'
    }
  }

  cursorImage.value = cursorImages[cursorKey] ?? defaultCursorImage
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
  <!-- cursor element -->
  <div class="cursor" :style="{
    top: `${cursorPos.y}px`, left: `${cursorPos.x}px`,
    transform: `rotate(${cursorPos.rotation}deg)`
  }">
    <img class="cursor-image" :src="cursorImage" />
  </div>
  
  {{ cursorPos }}
</template>

<style scoped>
.cursor {
  position: fixed;
  z-index: 2147483643;
  user-select: none;
  pointer-events: none;
  transform-origin: top left;
}
</style>