<script lang="ts" setup>
import './_index.css'
import type { Props } from './types'

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const firstFile = files[0]
    return firstFile
  }

  return null
}

const onFileChange = (event: Event) => {
  const file = handleChange(event)
  emit('update:modelValue', file)
}
</script>

<script lang="ts">
export default {
  name: 'DeSyFileInput'
}
</script>

<template>
  <div class="desy-file-input">
    <label
      :for="id"
      class="desy-file-input__label">
      {{ label }}
      <span
        v-if="required"
        class="desy-file-input__required">
        *
      </span>
    </label>

    <input
      :id="id"
      type="file"
      class="desy-file-input__input"
      :disabled="disabled"
      @change="handleChange" />

    <p
      v-if="helperText"
      class="desy-file-input__helper-text">
      {{ helperText }}
    </p>

    <p
      v-if="error"
      class="desy-file-input__error-text">
      {{ error }}
    </p>
  </div>
</template>
