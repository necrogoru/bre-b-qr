<script setup lang="ts">
import './_index.css'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Props } from './types'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  helper: '',
  name: '',
  value: '',
  error: false
})

const multiple = Array.isArray(props.modelValue)

const isChecked = computed(() => {
  if (!multiple) return props.modelValue

  const checksArray = props.modelValue
  return checksArray.includes(props.value as never)
})

function updateModalValue(event: Event) {
  if (props.disabled) return

  if (!multiple) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
    return
  }

  const checksArray = props.modelValue
  if (checksArray.includes(props.value as never)) {
    emit('update:modelValue', checksArray.filter((item: number | string) => item !== props.value))
  } else {
    emit('update:modelValue', [
      ...props.modelValue as [],
      props.value
    ])
  }
}
</script>

<script lang="ts">
export default {
  name: 'DeSyCheckbox'
}
</script>

<template>
  <div
    class="desy-checkbox"
    :class="{
      'desy-checkbox--disabled': disabled,
      'desy-checkbox--checked': isChecked,
      'desy-checkbox--error': error
    }">
    <label
      :for="id"
      tabindex="0">
      <span>
        <Icon
          icon="ic:check"
          size="16" />
      </span>

      <input
        :id
        type="checkbox"
        :name
        :value
        :checked="isChecked"
        @change="updateModalValue">

      <span
        v-if="label"
        class="desy-checkbox__label">
        {{ label }}
      </span>
    </label>

    <p v-if="helper">
      {{ helper }}
    </p>
  </div>
</template>
