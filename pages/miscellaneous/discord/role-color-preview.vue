<script setup lang="js">
const backgroundColors = [
  { 
    background: "#36373e", 
    nameColor: "#ffffff", 
    messageColor: "#dfe0e2" 
  }, 
  { 
    background: "#202024", 
    nameColor: "#fbfbfb", 
    messageColor: "#efeff0" 
  }, 
  { 
    background: "#0c0c0e", 
    nameColor: "#e3e3e6", 
    messageColor: "#dbdcdf" 
  }, 
  { 
    background: "#fbfbfb", 
    nameColor: "#2f3035", 
    messageColor: "#323339" 
  }
]

const holographic = ["#A9C9FF", "#FFBBEC", "#FFC3A0"];
// can't change colors in holographic

const gradientDefault = ["#0142b3", "#0072de"];

const displayName = ref('John Doe');

const colorStyle = ref('solid');
const roleColor = ref([null, null, null]);
const resultColor = ref([null, null, null]);

function changeRoleStyle(style) {
  if (colorStyle.value === "solid" && style === 'gradient') {
    if (roleColor.value[0] === null) roleColor.value[0] =　"#000000";
    
    roleColor.value[1] = roleColor.value[0];
  }
  
  colorStyle.value = style;
  
  if (roleColor.value[0] === "#000000" && colorStyle.value === 'solid') roleColor.value[0] =　null;

  resultColor.value = roleColor.value;
  if (colorStyle.value === 'holographic') resultColor.value = holographic.slice();
}

function changeColor(value) {
  // discord doesn't let us change holographic colors
  if (colorStyle.value === 'holographic') return;

  roleColor.value[0] = value
  if (value === "#000000" && colorStyle.value === "solid") roleColor.value[0] = null;
  resultColor.value = roleColor.value;
}
</script>
<template>
  <NuxtLayout 
    name="default" 
    title="Discord Role Color Preview"
    :description="useNuxtApp().$i18n.t('misc.list.rcp.description')"
    align="center">
    <h2 class="font-bold">Discord Role Color Preview</h2>
    <div class="container">
      <div class="preview">
        <div class="bg" v-for="col in backgroundColors" :style="{ background: col.background }">
          <div class="message">
            <div class="cozy">
              <div class="contents">
                <div class="avatar">
                  <div class="avatar-placeholder lase-color"></div>
                </div>
                <h2 class="name-header" :style="{ color: col.nameColor }">
                  <div
                    :data-text="displayName"
                    :class="`name ${colorStyle !== 'solid' ? 'name-gradient' : ''} ${colorStyle === 'holographic' ? 'name-holographic' : ''}`" 
                    :style="{
                      '--color-1': resultColor?.at(0),
                      '--color-2': resultColor?.at(1),
                      '--color-3': resultColor?.at(2) || resultColor?.at(0),
                    }">
                    {{ displayName }}
                  </div>
                  <span class="timestamp">
                    {{ new Date().toString().match(/\d{2}:\d{2}/)?.at(0) }}
                  </span>
                </h2>
                <div :style="{ color: col.messageColor }">{{ $t('misc.rcp.text') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="setting">
        <h4>{{ $t('misc.rcp.role_style') }}</h4>
        <div class="grid grid-cols-3 buttons">
          <button @click="changeRoleStyle('solid')">{{ $t('misc.rcp.role_style.solid') }}</button>
          <button @click="changeRoleStyle('gradient')">{{ $t('misc.rcp.role_style.gradient') }}</button>
          <button @click="changeRoleStyle('holographic')">{{ $t('misc.rcp.role_style.holographic') }}</button>
        </div>
        <h4 class="mt-px">{{ $t('misc.rcp.role_color') }}</h4>
        <div
          :class="`color-preview prev-${colorStyle}`" 
          :style="{
            '--color-1': resultColor?.at(0),
            '--color-2': resultColor?.at(1),
            '--color-3': resultColor?.at(2) || resultColor?.at(0),
          }">
          <div class="color-pick">
            <Icon class="color-pick-icon" name="tabler:color-picker" size="22"/>
          </div>
        </div>
        <ColorPicker 
          @update="changeColor"
          :value="''" />
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > div {
    margin: 8px;
  }
}
.preview {
  border: 1px solid gray;
  box-shadow: 0 0 8px gray;
  border-radius: 8px;
  font-family: 'Ubuntu Sans', 'Noto Sans', 'Noto Sans JP', sans-serif;
  height: fit-content;

  & > .bg:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  & > .bg:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
.message {
  padding: 16px;
}
.cozy {
  position: relative;
  padding: .125rem 69px;
  padding-right: 24px;
  min-height:  1.31rem;
  line-height: 1.31rem;
}
.contents {
  position: static;
  word-wrap: break-word;
  user-select: text;
  text-align: left;
}
.avatar {
  position: absolute;
  left: 16px;
  margin-top: calc(4px - .125rem);
  width : 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
  z-index: 1;
}
.avatar-placeholder {
  width : 100%;
  height: 100%;
}
.name-header {
  display: block;
  position: relative;
  white-space: break-spaces;
  word-wrap: pre-wrap;
  font-size: 100%;
  padding: 0;
}
.name {
  display: inline;
  font-weight: 600;
  color: var(--color-1);
}
.timestamp {
  color: color-mix(in oklab, hsl(234 calc(1*4.274%) 45.882% /1) 100%, #000 0%);
  font-size: .75rem;
  margin-left: .25rem;
  font-weight: 500;
  font-family: 'Ubuntu Sans', Ubuntu 'Noto Sans', sans-serif;
}

.name-gradient {
  background: linear-gradient(to right,
    var(--color-1),
    var(--color-2),
    var(--color-1)
  );
  background-size: 100px auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientUsernameAnimation 1.5s linear infinite;
  font-weight: 600;
  position: relative;

  & > .name-holographic {
    background: linear-gradient(to right,
      var(--color-1),
      var(--color-2),
      var(--color-3),
      var(--color-1)
    );
  }
  &::after {
    background: inherit;
    background-size: 100px auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientUsernameAnimation 1.5s linear infinite;
    content: attr(data-text) / "";
    position: absolute;
    inset: 0;
    opacity: .7;
    filter: blur(4px);
  }
}
@keyframes gradientUsernameAnimation {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 100px;
  }
}

.prev-solid {
  background: var(--color-1);
}
.prev-gradient {
  background: linear-gradient(to right,
    var(--color-1),
    var(--color-2)
  );
}
.prev-holographic {
  background: linear-gradient(to right,
    var(--color-1),
    var(--color-2),
    var(--color-3)
  );
}
.color-preview {
  margin: 4px;
  border-radius: 8px;
  border: 1px solid gray;
  box-shadow: 0 0 5px gray;
  height: 48px;
  display: grid;
  align-items: center;
  padding: 7px;
}
.color-pick {
  display: flex;
  align-items: center;
  justify-content: center;
  width:  32px;
  height: 32px;
  border: 1px solid white;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8),
    0 0 4px rgba(255, 255, 255, 0.5) inset;
  position: relative;
  background: rgba(0, 0, 0, 0.404);
}
.color-pick:after {
  content: '';
  filter: blur(4px);
  mask-image: inherit;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  background-color: black;
}
.color-pick-icon-shadow {
  position: absolute;
  inset: 4px;
  filter: blur(4px);
}
</style>