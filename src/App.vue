<script setup lang="ts">
import { ref } from 'vue'
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

const code = ref('')

const showLogo = ref(false)

const phone = ref('')

function generateQR() {
  console.log('Generating QR for', keyType.value, code.value)
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
        label="Número de teléfono"
        v-model="phone" />

      <DeSyInput
        v-if="keyType === 'email'"
        id="email"
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        type="email" />

      <DeSyInput
        id="cc"
        v-if="keyType === 'cc'"
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
