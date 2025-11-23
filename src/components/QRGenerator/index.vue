<script lang="ts" setup>
import './_index.css'
import QRCodeStyling, { type Options } from 'qr-code-styling'
import { Icon } from '@iconify/vue'
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

async function handlePrint() {
  if (!validData()) return;

  const printWindow = window.open('', '_blank', 'width=600,height=600');
  const rawData = await qrCode.value?.getRawData('svg')
  const svgUrl = rawData ? URL.createObjectURL(rawData) : '';

  if (printWindow && qrCode.value) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Código QR</title>
        </head>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          <figure>
            <img src="${svgUrl}" alt="Código QR" />
          </figure>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}

function handleShare() {
  if (!validData()) return;

  if (navigator.share) {
    qrCode.value?.getRawData('png').then((blob) => {
      const file = new File([blob], 'qr-code.png', { type: 'image/png' });
      navigator.share({
        title: 'Código QR',
        text: 'Aquí está mi código QR generado.',
        files: [file]
      }).catch((error) => console.error('Error al compartir:', error));
    });
  } else {
    alert('La función de compartir no está soportada en este navegador.');
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

    <div v-if="qrSvg">
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
          <Icon icon="mingcute:arrow-to-down-line" />
        </DeSyButton>

        <DeSyButton
          outlined
          type="button"
          @click="handleShare">
          <Icon icon="mingcute:share-2-line" />
        </DeSyButton>

        <DeSyButton
          outlined
          type="button"
          @click="handlePrint">
          <Icon icon="mingcute:print-line" />
        </DeSyButton>
      </div>
    </div>

    <p v-else>
      Ingresa un valor válido para generar el código QR.
    </p>
  </div>
</template>
