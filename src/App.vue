<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import DeSyButton from '@/components/DeSy/Button/index.vue'
import DeSySelect from '@/components/DeSy/Select/index.vue'
import DeSyInput from '@/components/DeSy/Input/index.vue'
import DeSyCheckbox from '@/components/DeSy/Checkbox/index.vue'
import DeSyFileInput from '@/components/DeSy/FileInput/index.vue'
import DeSyPhoneInput from '@/components/DeSy/PhoneInput/index.vue'
import QRGenerator from '@/components/QRGenerator/index.vue'

const keyType = ref('phone')

const options = [
  { label: 'Teléfono', value: 'phone' },
  { label: 'Identificación', value: 'identification' },
  { label: 'Correo electrónico', value: 'email' },
  { label: 'Código', value: 'code' }
]

const phone = ref('')
const identification = ref('')
const email = ref('')
const code = ref('')

function setPhone(newPhone: string) {
  phone.value = newPhone.replaceAll(' ', '')
}

const showLogo = ref(false)
const logo = ref<File>()

const currentData = computed(() => {
  const dataMap: Record<string, string> = {
    phone: phone.value,
    identification: identification.value,
    email: email.value,
    code: `@${code.value}`
  }

  return dataMap[keyType.value] || ''
})

const qrComponent = ref<InstanceType<typeof QRGenerator> | null>(null)
function generateQR() {
  if(!currentData.value) {
    alert('Por favor, ingresa un valor válido para generar el QR.')
    return
  }

  qrComponent.value?.generateQR()
}
</script>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-end p-16">
      <a
        href="https://github.com/necrogoru/bre-b-qr"
        target="_blank"
        class="rounded-full border border-structure-50 p-2"
        rel="noopener noreferrer">
        <Icon
          icon="mingcute:github-fill"
          class="text-24" />
      </a>
    </header>

    <main class="w-full md:max-w-[80vw] mx-auto px-20 pb-24 md:px-24 flex-1 flex flex-col md:flex-row gap-32 mt-20">
      <section class="flex-none w-full md:max-w-420">
        <h1>
          Generador de QR Bre-b
        </h1>

        <p class="mt-12 text-12">
          Crea un QR para tu llave BRE-B
        </p>

        <form
          class="mt-20 flex flex-col gap-16"
          @submit.prevent="generateQR">
          <DeSySelect
            id="key-type"
            v-model="keyType"
            label="Tipo de llave"
            required
            :options />

          <DeSyInput
            v-show="keyType === 'code'"
            id="code"
            required
            v-model="code"
            label="Código"
            prefix="@"
          />

          <DeSyPhoneInput
            v-show="keyType === 'phone'"
            id="phone"
            required
            label="Número de teléfono"
            @update:national-number="setPhone" />

          <DeSyInput
            v-show="keyType === 'email'"
            id="email"
            required
            v-model="email"
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            type="email" />

          <DeSyInput
            v-show="keyType === 'identification'"
            id="identification"
            required
            v-model="identification"
            placeholder="1234567890"
            label="Número de identificación"
            type="number" />

          <DeSyFileInput
            id="logo"
            label="Logo"
            accept="image/*"
            v-model="logo"/>

          <DeSyButton type="submit">
            Generar QR
          </DeSyButton>
        </form>
      </section>

      <div class="flex-1">
        <QRGenerator
          ref="qrComponent"
          :data="currentData"
          :image="logo" />
      </div>
    </main>

    <footer>
      <p class="mt-20 pb-12 text-center text-sm text-gray-500 text-14">
        &copy; 2025 necrogoru. Todos los derechos reservados.
      </p>
    </footer>
  </div>
</template>
