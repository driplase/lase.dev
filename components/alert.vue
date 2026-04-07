<script setup lang="ts">
defineProps<{
  title?: string,
  description?: string,
  icon?: string,
  color?: string,
  borderColor?: string,
  class?: string,
}>()
</script>

<template>
  <div :class="`alert ${$props.class}`" :style="{
    '--background-color': `var(--color-${color})`,
    '--border-color': `var(--color-${borderColor})`,
  }">
    <div class="flex flex-row gap-1">
      <div class="alert-icon">
        <slot name="icon">
          <Icon v-if="icon" :name="icon" size="20" />
        </slot>
      </div>

      <div>

        <div class="alert-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
    
        <div class="alert-description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.alert {
  background: var(--background-color, var(--color-alert-background));
  border: 1px solid var(--border-color, var(--color-alert-border));
  margin-top:    .625rem;
  margin-bottom: .625rem;
  padding: .25rem .5rem;
  border-radius: .325rem;
}

.alert-title {
  text-align: start;
}

.alert-description {
  text-align: start;
  font-size: .875rem;
}
</style>