<script setup lang="ts">
import './_index.css'
import { computed } from 'vue'
import type { Props } from './types'
import DeSyLoader from '@/components/DeSy/Loader/index.vue'

const props = withDefaults(defineProps<Props>(), {
  color: 'purple',
  disabled: false,
  type: 'button',
  loading: false,
  outlined: false
})

const buttonClasses = computed(() => {
  const classes = ['desy-button']

  // Add variant and color classes
  classes.push(`desy-button--${props.color}`)

  if (props.outlined) {
    classes.push('desy-button--outlined')
  }

  // Add disabled state
  if (props.disabled || props.loading) {
    classes.push('desy-button--disabled')
  }

  if (props.loading) {
    classes.push('desy-button--loading')
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
    class="desy-button"
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading">
    <span
      v-if="loading"
      class="desy-button__loader">
      <DeSyLoader />
    </span>

    <slot />
  </button>
</template>
