<script setup lang="ts">
import { computed } from 'vue'
import type { Props, Emits } from './types'
import './_index.css'

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  placeholder: '',
  size: 'medium',
  variant: 'outlined'
})

const emit = defineEmits<Emits>()

const inputClasses = computed(() => [
  'desy-input',
  `desy-input--${props.size}`,
  `desy-input--${props.variant}`,
  {
    'desy-input--disabled': props.disabled,
    'desy-input--error': props.error,
    'desy-input--readonly': props.readonly
  }
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <div class="desy-input-wrapper">
    <label v-if="label" :for="id" class="desy-input-label">
      {{ label }}
      <span v-if="required" class="desy-input-required">*</span>
    </label>

    <div class="desy-input-container">
      <span v-if="prefix" class="desy-input-prefix">
        {{ prefix }}
      </span>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span v-if="suffix" class="desy-input-suffix">
        {{ suffix }}
      </span>
    </div>

    <span v-if="error" class="desy-input-error-message">{{ error }}</span>
    <span v-else-if="helperText" class="desy-input-helper-text">{{ helperText }}</span>
  </div>
</template>
