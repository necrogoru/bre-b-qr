<script lang="ts" setup>
import './_index.css'
import type { Props } from './types'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'purple',
  disabled: false,
  type: 'button',
  loading: false
})

const buttonClasses = computed(() => {
  const classes = ['desy-button']

  // Add variant and color classes
  classes.push(`desy-button--${props.variant}`)
  classes.push(`desy-button--${props.color}`)

  // Add disabled state
  if (props.disabled || props.loading) {
    classes.push('desy-button--disabled')
  }

  return classes.join(' ')
})
</script>

<script lang="ts">
export default {
  name: 'DeSyButton'
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="desy-button__loader">⏳</span>
    <slot />
  </button>
</template>
