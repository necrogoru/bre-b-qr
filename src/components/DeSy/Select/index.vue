<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  disabled: false,
  searchable: false,
  clearable: false,
  multiple: false,
  className: ''
})

const emit = defineEmits<{
  'update:value': [value: string | number | (string | number)[]]
  change: [value: string | number | (string | number)[]]
}>()

const selectRef = ref<HTMLSelectElement | null>(null)
const selectedValues = ref<(string | number)[]>(
  props.multiple && props.value
    ? Array.isArray(props.value)
      ? props.value
      : [props.value]
    : []
)

const displayValue = computed(() => {
  if (props.multiple && selectedValues.value.length > 0) {
    return selectedValues.value
      .map(val => props.options.find(opt => opt.value === val)?.label)
      .filter(Boolean)
      .join(', ')
  }
  if (props.value !== undefined) {
    return props.options.find(opt => opt.value === props.value)?.label || ''
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
    emit('update:value', selected)
    emit('change', selected)
  } else {
    const value = target.value
    const parsedValue = isNaN(Number(value)) ? value : Number(value)
    emit('update:value', parsedValue)
    emit('change', parsedValue)
  }
}

const clearSelection = () => {
  if (props.multiple) {
    selectedValues.value = []
    emit('update:value', [])
    emit('change', [])
    if (selectRef.value) {
      selectRef.value.selectedIndex = -1
    }
  } else {
    emit('update:value', '')
    emit('change', '')
    if (selectRef.value) {
      selectRef.value.value = ''
    }
  }
}

const isSelected = (value: string | number) => {
  if (props.multiple) {
    return selectedValues.value.includes(value)
  }
  return props.value === value
}
</script>

<script lang="ts">
export default {
  name: 'DeSySelect'
}
</script>

<template>
  <div :class="['desy-select', className, { 'desy-select--disabled': disabled, 'desy-select--error': error }]">
    <label v-if="label" class="desy-select__label">{{ label }}</label>

    <div class="desy-select__wrapper">
      <select
        ref="selectRef"
        :class="['desy-select__native']"
        :disabled="disabled"
        :multiple="multiple"
        :value="multiple ? undefined : value"
        @change="handleChange"
      >
        <option v-if="!multiple && placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :selected="isSelected(option.value)"
        >
          {{ option.label }}
        </option>
      </select>

      <button
        v-if="clearable && displayValue"
        type="button"
        class="desy-select__clear"
        @click="clearSelection"
      >
        ×
      </button>
    </div>

    <span v-if="error" class="desy-select__error">{{ error }}</span>
  </div>
</template>
