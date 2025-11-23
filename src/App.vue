<script setup lang="ts">
import { ref } from 'vue'
import QRCode from 'qrcode'
import DeSyButton from '@/components/DeSy/Button/index.vue'
import DeSySelect from '@/components/DeSy/Select/index.vue'
import DeSyInput from '@/components/DeSy/Input/index.vue'
import DeSyCheckbox from '@/components/DeSy/Checkbox/index.vue'
import DeSyPhoneInput from '@/components/DeSy/PhoneInput/index.vue'

const keyType = ref(undefined)

const options = [
  { label: 'Teléfono', value: 'phone' },
  { label: 'Identificación', value: 'cc' },
  { label: 'Correo electrónico', value: 'email' },
  { label: 'Código', value: 'code' }
]


const showLogo = ref(false)

const phone = ref('')
const identification = ref('')
const email = ref('')
const code = ref('')

function generateQR() {
  QRCode.toCanvas(
    document.getElementById('qr') as HTMLCanvasElement,
    'BREB:' + (keyType.value === 'phone' ? phone.value : keyType.value === 'code' ? '@' + code.value : ''),
    {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }
  )
}
</script>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<template>
  <div class="p-20">
    <h1>
      QR BRE-B
    </h1>

    <p class="mt-12">
      Crea un QR para tu llave BRE-B
    </p>

    <form
      class="mt-16 flex flex-col gap-8"
      @submit.prevent="generateQR">
      <DeSySelect
        id="key-type"
        v-model="keyType"
        label="Tipo de llave"
        :options />

      <div class="p-2 mt-4 w-120" />

      <DeSyInput
        v-if="keyType === 'code'"
        id="code"
        v-model="code"
        label="Código"
        prefix="@"
      />

      <DeSyPhoneInput
        v-if="keyType === 'phone'"
        id="phone"
        v-model="phone"
        label="Número de teléfono" />

      <DeSyInput
        v-if="keyType === 'email'"
        id="email"
        v-model="email"
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        type="email" />

      <DeSyInput
        v-if="keyType === 'cc'"
        id="cc"
        v-model="identification"
        placeholder="1234567890"
        label="Número de identificación"
        type="number" />

      <DeSyCheckbox
        id="show-logo"
        v-model="showLogo"
        label="Añadir logo al QR"
      />

      <input type="file">

      <DeSyButton type="submit">
        Generar QR
      </DeSyButton>
    </form>

    <div>
      <canvas id="qr"></canvas>
    </div>
  </div>
</template>
