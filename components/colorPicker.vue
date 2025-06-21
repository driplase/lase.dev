<script setup>
import Color from 'color';
import InputItem from './InputItem.vue';

const model = defineModel()
const props = defineProps({
  value: String,
})

const hue = ref(0);
const saturation = ref(0);
const value = ref(0);

const hex = ref(null);
const hexn = ref(null);

const huerCursorPos = ref(hue.value / 360 * 220);
const satCursorPosX = ref(saturation.value * 220);
const satCursorPosY = ref(150 - value.value * 150);

function handleHuerMove(event) {
  const width = 220;
  hue.value = Math.max(0, Math.min(360, event.offsetX / width * 360));
  huerCursorPos.value = Math.max(0, Math.min(width, event.offsetX));
}
function huerDrag(event) {
  handleHuerMove(event);

  function onMove(e) {
    const rect = event.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    handleHuerMove({ offsetX });
    getColor();
  }
  function onUp() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  }
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function handleSatMove(event) {
  const width = 220;
  const height = 150;
  saturation.value = Math.max(0, Math.min(1, event.offsetX / width));
  value.value = Math.max(0, Math.min(1, (height - event.offsetY) / height));
  satCursorPosX.value = Math.max(0, Math.min(width, event.offsetX));
  satCursorPosY.value = Math.max(0, Math.min(height, event.offsetY));
}
function satDrag(event) {
  handleSatMove(event);

  function onMove(e) {
    const rect = event.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    handleSatMove({ offsetX, offsetY });
    getColor();
  }
  function onUp() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  }
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function getColor() {
  const col = Color.hsv(
    hue.value,
    saturation.value * 100,
    value.value * 100,
  )

  hexn.value = col.rgbNumber();
  hex.value = col.hex().toLowerCase();
  model.value = hexn.value;
}

getColor();
</script>
<template>
  <div class="dropmenu">
    <div class="sat-base"
      @mousedown="satDrag" 
      :style="{
        background: `hsl(${hue}deg, 100%, 50%)`
      }">
      <div class="sat-white"></div>
      <div class="sat-black"></div>
      <div class="sat-cursor" :style="{
        left: `${satCursorPosX}px`,
        top:  `${satCursorPosY}px`,
      }"></div>
    </div>
    <div class="huer" @mousedown="huerDrag">
      <div class="huer-thumb" :style="{
        left: `${huerCursorPos}px`
      }"></div>
    </div>
    <InputItem type="text" v-model="hex" class="monospace" />
  </div>
</template>
<style scoped>
.dropmenu {
  display: block;
  width: 240px;
  padding: 10px;
  border-radius: 8px;
  user-select: none;
}
.sat-base {
  width: calc(240px - 20px);
  height: 150px;
  background: hsl(0, 100%, 50%);
  position: relative;
  margin-bottom: 16px;
}
.sat-white {
  background: linear-gradient(90deg, #fff, #ffffff00);
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.sat-black {
  background: linear-gradient(0deg, #000, #00000000);
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.huer {
  width: calc(240px - 20px);
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  position: relative;
  margin-bottom: 8px;
}

.sat-cursor {
  width:  5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px rgb(255, 255, 255),
    rgba(0, 0, 0, .3) 0 0 1px 1px inset,
    rgba(0, 0, 0, .4) 0 0 2px 2.25px;
  position: absolute;
  transform: translate(-2.5px, -2.5px);
  pointer-events: none;
}
.huer-thumb {
  background: white;
  box-shadow: 0 0 4px black;
  height: 16px;
  width: 7.5px;
  transform: translate(-3.75px, -4px);
  border-radius: 3.75px;
  position: absolute;
  pointer-events: none;
}
input {
  width: 100%;
}
</style>