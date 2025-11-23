<script lang="ts" setup>
import './_index.css'
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { readFileAsDataURL } from './utils'

import type { Props } from './types'

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const loadedFile = ref<File>()
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const firstFile = files[0]
    loadedFile.value = firstFile
    return firstFile
  }

  return null
}

const imageUrl = ref<string>('')
watch(loadedFile, async (newFile: File | undefined) => {
  if (newFile) {
    const dataUrl = await readFileAsDataURL(newFile)
    imageUrl.value = dataUrl || ''
    emit('update:modelValue', newFile)
  } else {
    imageUrl.value = ''
    emit('update:modelValue', null)
  }
})
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

    <div class="desy-file-input__input">
      <span>
        <Icon
          v-if="!loadedFile || (loadedFile && !loadedFile.type.includes('image'))"
          icon="mingcute:file-upload-line" />

        <img
        v-else
        :src="imageUrl"
        alt="Logo preview">
      </span>

      <input
        :id="id"
        type="file"
        :accept
        placeholder="Sube un logo"
        :disabled="disabled"
        @change="handleChange" />
    </div>

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
