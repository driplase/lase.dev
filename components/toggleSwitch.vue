<script setup lang="ts">
const props = defineProps({
  checked: Boolean,
})

const model = defineModel()
</script>
<template>
  <div class="toggle-switch">

    <label>

      <input 
        class="toggle-switch-checkbox"
        type="checkbox"
        v-model="model"
        :checked="checked"
      >
  
      <div
        class="toggle-switch-display"
      ></div>

    </label>

  </div>
</template>
<style scoped>
.toggle-switch {
  --outside-width: 3rem;
  --outside-height: 1.5rem;

  --inside-ball-size: 1.1rem;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  
  display: inline-flex;
  margin: 0 .25rem;
  vertical-align: top;
}

.toggle-switch-checkbox {
  display: none;
}

.toggle-switch-display {

  position: relative;

  width: var(--outside-width);
  height: var(--outside-height);

  border-radius: calc(var(--outside-height) / 2);

  background: rgb(206, 206, 206);

  transition: .36s var(--ease-out-expo);
  
  /* inside circle */
  &::after {
    content: '';
    
    position: absolute;
    z-index: 2;
    top: calc(var(--outside-height) / 2);
    left: calc(var(--outside-height) / 2);
    
    transform: translate(-50%, -50%);
    
    width : var(--inside-ball-size);
    height: var(--inside-ball-size);
    
    border-radius: .65rem;
    
    background: white;

    box-shadow: 0 0 8px rgba(128, 128, 128, 0.5);

    transition: .36s var(--ease-out-expo);
  }
}

/* checked (ON) style */
.toggle-switch-checkbox:checked + .toggle-switch-display {
  background: rgb(116, 243, 116);
  
  /* inside circle */
  &::after {
    left: calc(var(--outside-height) / 2 + (var(--outside-width) - var(--outside-height)));
  }
}
</style>