<script lang="ts" setup>
import './_index.css'
import { ref, computed } from 'vue'
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona una opción',
  disabled: false,
  searchable: false,
  clearable: false,
  multiple: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
  change: [value: string | number | (string | number)[]]
}>()

const selectedValues = ref<(string | number)[]>(
  props.multiple && props.modelValue
    ? Array.isArray(props.modelValue)
      ? props.modelValue
      : [props.modelValue]
    : []
)

const displayValue = computed(() => {
  if (props.multiple && selectedValues.value.length > 0) {
    return selectedValues.value
      .map(val => props.options.find(opt => opt.value === val)?.label)
      .filter(Boolean)
      .join(', ')
  }
  if (props.modelValue !== undefined) {
    return props.options.find(opt => opt.value === props.modelValue)?.label || ''
  }
  return ''
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement

  if (props.multiple) {
    const selected = Array.from(target.selectedOptions).map(option => {
      const value = option.value
      return isNaN(Number(value)) ? value : Number(value)
    })
    selectedValues.value = selected

    emit('update:modelValue', selected)
    emit('change', selected)
  } else {
    const value = target.value
    const parsedValue = isNaN(Number(value)) ? value : Number(value)
    emit('update:modelValue', parsedValue)
    emit('change', parsedValue)
  }
}

const isSelected = (value: string | number) => {
  if (props.multiple) {
    return selectedValues.value.includes(value)
  }
  return props.modelValue === value
}

const control = ref<HTMLSelectElement | null>(null)
const openSelectDropdown = () => {
  if (!control.value) return

  control.value.focus()
  if (control.value && 'showPicker' in HTMLSelectElement.prototype) {
    try {
      control.value.showPicker()
    } catch (error) {
      // Ignore errors
    }
  }
}
</script>

<script lang="ts">
export default {
  name: 'DeSySelect'
}
</script>

<template>
  <div
    class="desy-select"
    :class="{
      'desy-select--disabled': disabled,
      'desy-select--error': error
    }"
    @click="openSelectDropdown">
    <label
      v-if="label"
      :for="id"
      class="desy-select__label">
      {{ label }}
    </label>

    <fieldset>
    <select
      :id
      ref="control"
      :disabled="disabled"
      :multiple="multiple"
      :value="multiple ? undefined : modelValue"
      @change="handleChange">
      <option
        v-if="!multiple && placeholder"
        value=""
        disabled
        selected>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :selected="isSelected(option.value)">
        {{ option.label }}
      </option>
    </select>
    </fieldset>

    <span
      v-if="error"
      class="desy-select__error">
      {{ error }}
    </span>
  </div>
</template>
