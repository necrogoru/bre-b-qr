<script setup lang="ts">
import './_index.css'
import { computed } from 'vue'
import type { Props, Emits } from './types'

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  placeholder: '',
  size: 'medium',
  variant: 'outlined'
})

const emit = defineEmits<Emits>()

const inputClasses = computed(() => ({
  'desy-input--disabled': props.disabled,
  'desy-input--error': props.error,
  'desy-input--readonly': props.readonly
}))

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
  <div class="desy-input">
    <label
      v-if="label"
      :for="id"
      class="desy-input__label">
      {{ label }}
      <span
        v-if="required"
        class="desy-input--required">
        *
      </span>
    </label>

    <div class="desy-input__container">
      <span
        v-if="prefix"
        class="desy-input__prefix">
        {{ prefix }}
      </span>

      <input
        :id
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

      <span
        v-if="suffix"
        class="desy-input__suffix">
        {{ suffix }}
      </span>
    </div>

    <span
      v-if="error"
      class="desy-input__error-message">
      {{ error }}
    </span>

    <span
      v-else-if="helperText"
      class="desy-input__helper-text">
      {{ helperText }}
    </span>
  </div>
</template>
