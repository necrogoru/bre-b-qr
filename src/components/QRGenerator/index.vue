<script lang="ts" setup>
import './_index.css'
import QRCodeStyling from 'qr-code-styling'
import DeSyButton from '@/components/DeSy/Button/index.vue'
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

    <figure id="qr" />

    <div class="flex gap-12">
      <DeSyButton
        type="button"
        @click="handleDownload">
        Descargar QR
      </DeSyButton>

      <DeSyButton
        type="button"
        @click="handlePrint">
        Imprimir QR
      </DeSyButton>
    </div>
  </div>
</template>
