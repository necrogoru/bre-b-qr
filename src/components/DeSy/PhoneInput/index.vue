<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import intlTelInput from 'intl-tel-input'
import type { Iti } from 'intl-tel-input'
import './_index.css'

import type { Props } from './types'

const emit = defineEmits(['update:modelValue', 'update:phone', 'error', 'blur', 'update:nationalNumber'])

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: '',
  modelValue: '',
  required: false,
  success: false,
  error: '',
  hideError: false
})

const input = ref()
function focus() {
  input.value!.focus()
}
defineExpose({
  focus
})

const iti = ref<Iti | null>(null)

const phoneError = ref<string>('')

const finalError = computed(() => {
  return phoneError.value || props.error
})
const errorStrings = [
  'Number possibly valid',
  'Invalid country code',
  'Number too short',
  'Number too long',
  'Number valid locally only',
  'Invalid number length'
]

function onInputChange() {
  const numberWithCode = iti.value!.getNumber()
  const nationalNumber = iti.value!.getNumber(intlTelInput.utils?.numberFormat.NATIONAL)

  const newError = iti.value!.getValidationError()
  phoneError.value = newError > 0 ? errorStrings[newError] : ''

  emit('update:modelValue', numberWithCode)
  emit('update:nationalNumber', nationalNumber)
  emit('error', phoneError.value)
}

onMounted(async () => {
  iti.value = intlTelInput(input.value, {
    initialCountry: 'co',
    countryOrder: ['co'],
    autoPlaceholder: 'polite',
    loadUtils: () => import("intl-tel-input/utils")
  })

  await iti.value.promise

  if (props.modelValue) {
    iti.value.setNumber(props.modelValue)
  }

  input.value.addEventListener('countrychange', onInputChange)
})

onBeforeUnmount(() => {
  input.value?.removeEventListener('countrychange', onInputChange)
  iti.value!.destroy()
})
</script>

<script lang="ts">
export default {
  name: 'DeSyPhoneInput'
}
</script>

<template>
  <div
    class="desy-phone-input"
    :class="{
      'desy-phone-input--disabled': disabled,
      'desy-phone-input--error': finalError
    }">
    <label
      v-if="label"
      :for="id">
      {{ label }}

      <span
        v-if="required"
        class="desy-phone-input__required">
        *
      </span>
    </label>

    <input
      :id="id"
      ref="input"
      type="text"
      :required="required"
      :name="id"
      :disabled
      inputmode="numeric"
      @input="onInputChange"
      @blur="emit('blur')">

    <p v-if="finalError && !hideError">
      {{ finalError }}
    </p>
  </div>
</template>
