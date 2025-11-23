<script lang="ts" setup>
import './_index.css'
import { computed } from 'vue'
import DeSyToast from '@/components/DeSy/Toast/index.vue'
import toastState from './state'

const toasts = computed(() => toastState.toasts.value)
</script>

<script lang="ts">
export default {
  name: 'desy-toasts'
}
</script>

<template>
  <TransitionGroup
    name="toasts"
    class="desy-toasts"
    tag="div">
    <DeSyToast
      v-for="toast in toasts"
      :key="toast.id"
      :toast
      @close="toastState.removeToast(toast.id)"
    />
  </TransitionGroup>
</template>
