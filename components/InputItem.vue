<script setup>
const props = defineProps({
  label: String,
  minlength: String || Number,
  maxlength: String || Number,
  modelValue: String, // For v-model binding
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  pattern: String, // Regex pattern
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isValid = ref(true);

watch(() => props.modelValue, (newValue) => {
  if (props.pattern) {
    const regex = new RegExp(props.pattern);
    isValid.value = regex.test(newValue);
  }
});
</script>

<template>
  <div class="input">
    <label class="label">
      {{ props.label }}
    </label>
    <input
      :minlength="props.minlength"
      :maxlength="props.maxlength"
      :pattern="props.pattern"
      :placeholder="props.placeholder"
      :required="props.required"
      :type="props.type"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :class="{ 'invalid': !isValid }"
    />
    <p v-if="!isValid" class="error-message">Invalid format</p>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  margin: 5px auto;
}
.label {
  font-size: 14px;
}
.error-message {
  color: red;
  font-size: 13px;
}
</style>