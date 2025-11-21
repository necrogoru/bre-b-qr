<script setup lang="ts">
import './assets/main.css';
import { ref } from 'vue'
import DeSyButton from '@/components/DeSy/Button/index.vue'
import DeSySelect from '@/components/DeSy/Select/index.vue'
import DeSyInput from '@/components/DeSy/Input/index.vue'

const keyType = ref(undefined)

const options = [
  { label: 'Teléfono', value: 'phone' },
  { label: 'Identificación', value: 'cc' },
  { label: 'Correo electrónico', value: 'email' },
  { label: 'Código', value: 'code' }
]

const code = ref('')

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
  <div class="p-24">
    <h1 class="text-40">QR BRE-B</h1>

    <p class="text-40">
      Crea un QR para tu llave BRE-B
    </p>

    <form @submit.prevent="generateQR">
      <DeSySelect
        v-model="keyType"
        :options />

      <DeSyInput
        v-model="code"
        label="Código"
        prefix="@"
      />
      Para cofigo add @

      <DeSyInput type="text" />

      Para cofigo add @ email
      <DeSyInput type="email" />

      identificación
      <DeSyInput type="number" />

      identificación add phone input
      <DeSyInput type="number" />

      logo
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
