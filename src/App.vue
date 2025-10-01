<script lang="ts" setup>
import DeSyButton from '@/components/DeSy/Button/index.vue'
</script>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<template>
  <div>
    App


    <DeSyButton variant="filled" color="purple">Purple Filled</DeSyButton>
    <DeSyButton variant="outline" color="purple">Purple Outline</DeSyButton>
    <DeSyButton variant="ghost" color="purple">Purple Ghost</DeSyButton>
    <br />
    <DeSyButton variant="filled" color="error">Error Filled</DeSyButton>
    <DeSyButton variant="outline" color="error">Error Outline</DeSyButton>
    <DeSyButton variant="ghost" color="error">Error Ghost</DeSyButton>
  </div>
</template>
