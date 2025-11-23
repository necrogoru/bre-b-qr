<script lang="ts" setup>
import './_index.css'
import type { Props } from './types'

defineProps<Props>()

</script>

<script lang="ts">
export default {
  name: 'DeSyToast'
}
</script>

<template>
  <div
    class="desy-toast"
    :class="`desy-toast--${toast.type || 'info'}`">
    {{ toast.message }}
  </div>
</template>
