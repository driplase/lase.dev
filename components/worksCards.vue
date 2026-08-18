<script setup>
const { title, url, external: isExternal } = defineProps({
  title: String,
  url: String,
  external: Boolean,
})

let isURLvalid = true;
try {
  new URL(url);
} catch {
  isURLvalid = false;
}

const target = ref("_self");
target.value = isExternal ? '_blank' : '_self';
</script>
<template>
  <NuxtLink
    class="root-link"
    :to="isExternal ? url : $localePath(url)" 
    :target>
    <div :class="
      `card` 
    ">
      <EffectWrapper as="h3" flash>
        {{ title }}
        <Icon
          v-if="target === '_blank'"
          name="tabler:external-link" 
          class="icon"
        />
      </EffectWrapper>
      <slot />
    </div>
  </NuxtLink>
</template>
<style scoped>
.card {
  background: rgb(28, 32, 66);
  padding: 12px 16px;
  padding-top: 6px;
  margin: 8px 4px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid rgb(123, 127, 129);
  box-shadow: 0 0 8px rgba(123, 127, 129, 0.63);
  width: 100%;
}
.root-link {
  color: var(--color-text);
  text-decoration: none;
}
</style>