<script setup lang="ts">
const { t } = useI18n()
useHeadTemplate(useRoute(), {
  title: t('misc.tanabata.title'),
  description: t("misc.tanabata.description")
})
const treeRotation = ref<number>(0);
const tanzakuRotation = ref<number>(0);

const tick = (timestamp: number) => {
  treeRotation.value = Math.sin(timestamp / 1_250) * 3;
  tanzakuRotation.value = Math.sin(timestamp / 1_250 + 500) * -8;
  window.requestAnimationFrame(tick)
}

onMounted(() => {
  window.requestAnimationFrame(tick)
})
</script>

<template>
  {{ $t('misc.tanabata.im_not_late') }}

  <div class="tanabata-container">
    <div class="tree-container" :style="{
        transform: `rotateZ(${treeRotation}deg)`
      }">
      <NuxtImg
        src="/assets/images/tanabata/tree.png"
        class="tanabata-tree"
      />
      <div class="tanabata-tanzaku" ref="tanzaku" :style="{
        transform: `rotateZ(${tanzakuRotation}deg)`
      }">
        <NuxtImg src="/assets/images/tanabata/tanzaku.png" />
        <NuxtImg src="/assets/images/tanabata/lases_tanzaku_wish_2026.png" aria-label="なやみごとがいつかすべて解消していますように...。 - driplase" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes originTest {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}

.tanabata-container {
  position: relative;
  width: 80vw;
  max-width: 48rem;
  aspect-ratio: 1 / 1;
}

.tree-container {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: 29% 73%;
  /* animation: originTest 2s linear infinite; */
}


.tanabata-tree,
.tanabata-tanzaku {
  position: absolute;
  width: 100%;
  aspect-ratio: 1 / 1;
  user-select: none;
  pointer-events: none;
}

.tanabata-tanzaku {
  transform-origin: 63% 33%;
  /* animation: originTest 2s linear infinite; */

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>