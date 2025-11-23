<script lang="ts" setup>
import './_index.css'
import QRCodeStyling from 'qr-code-styling'
import { ref } from 'vue'
import type { Props } from './types'

const props = defineProps<Props>()

const qrCode = ref<QRCodeStyling>()
function generateQR() {
  qrCode.value = new QRCodeStyling({
    width: 1024,
    height: 1024,
    type: "svg",
    data: props.data,
    image: props.image ? URL.createObjectURL(props.image) : undefined,
    dotsOptions: {
      color: "#000000"
    },
    backgroundOptions: {
      color: "#fefefe",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

  const qrElement = document.getElementById('qr');

  qrCode.value.append(qrElement!);
}

defineExpose({
  generateQR
})
</script>

<script lang="ts">
export default {
  name: 'QRGenerator'
}
</script>

<template>
  <div class="qr-generator">
    <figure id="qr" />
  </div>
</template>
