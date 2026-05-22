<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'no-cursor-page'
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

onMounted(() => {
  mousePos.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
  cursorPos.value.x = window.innerWidth / 2
  cursorPos.value.y = window.innerHeight / 2

  window.addEventListener('mousemove', event => {
    mousePos.value = {
      x: event.clientX,
      y: event.clientY,
    };
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

    velocity.x = (mousePos.value.x - cursorPos.value.x) / 3 * delta / baseTime
    velocity.y = (mousePos.value.y - cursorPos.value.y) / 3 * delta / baseTime

    cursorPos.value.x += velocity.x
    cursorPos.value.y += velocity.y
    cursorPos.value.rotation = (cursorMovement.x + cursorMovement.y)

    cursorMovement.x -= cursorMovement.x / 2.5 * delta / baseTime;
    cursorMovement.y -= cursorMovement.y / 1.25 * delta / baseTime;
    
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
    <img class="cursor-image" src="https://driplase.github.io/cursor/cursor.svg" />
  </div>

  <p>

  </p>
</template>

<style scoped>
.cursor {
  position: fixed;
  z-index: 2147483647;
  user-select: none;
  pointer-events: none;
  transform-origin: top left;
}
</style>