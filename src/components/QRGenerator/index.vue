<script lang="ts" setup>
import './_index.css'
import QRCodeStyling, { type Options } from 'qr-code-styling'
import DeSyButton from '@/components/DeSy/Button/index.vue'
import { ref, computed } from 'vue'
import type { Props } from './types'

const props = defineProps<Props>()

const qrCode = ref<QRCodeStyling>()
const qrOptions = computed<Options>(() => ({
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
}))

const qrSvg = ref<string>('')
async function generateQR() {
  if (!qrCode.value) qrCode.value = new QRCodeStyling(qrOptions.value);
  else qrCode.value.update(qrOptions.value);

  const rawData = await qrCode.value.getRawData('svg');
  qrSvg.value = URL.createObjectURL(rawData);
}

function validData() {
  if (!props.data) {
    alert('Por favor, ingresa un valor válido para generar el QR.');
    return false;
  }

  return true
}

function handleDownload() {
  if (!validData()) return;

  qrCode.value?.download({ extension: 'png' });
}

function handlePrint() {
  if (!validData()) return;

  const printWindow = window.open('', '_blank', 'width=600,height=600');
  if (printWindow && qrCode.value) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Código QR</title>
        </head>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          ${qrCode.value?._domCanvas?.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
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
    <h2>
      Código QR
    </h2>

    <div v-if="data">
      <figure>
        <img
          :src="qrSvg"
          alt="">
      </figure>

      <div class="flex justify-center gap-12">
        <DeSyButton
          outlined
          type="button"
          @click="handleDownload">
          Descargar
        </DeSyButton>

        <DeSyButton
          outlined
          type="button"
          @click="handlePrint">
          Imprimir
        </DeSyButton>
      </div>
    </div>

    <p v-else>
      Ingresa un valor válido para generar el código QR.
    </p>
  </div>
</template>
