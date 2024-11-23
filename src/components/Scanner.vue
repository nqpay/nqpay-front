<template>
  <div class="bg-[#F7F7FA] flex flex-col w-screen h-screen text-black relative">
    <!-- Error message -->
    <div v-if="errorMessage" 
         class="fixed top-4 left-0 right-0 mx-4 bg-red-500 text-white p-4 rounded-lg animate-fade-in-down z-50 flex justify-between items-center">
      <span>{{ errorMessage }}</span>
      <button @click="errorMessage = ''" class="text-white hover:text-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Back button -->
    <div class="absolute top-4 left-4 z-10">
      <button 
        @click="goBack"
        class="flex items-center justify-center bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
      </button>
    </div>
    <!-- Main content -->
    <div class="flex-1 flex justify-center items-center">
      <template v-if="isAuthenticated">
        <qrcode-stream @detect="onDetect"></qrcode-stream>
      </template>
      <template v-else>
        <div class="animate-pulse">
          <div class="w-64 h-64 bg-gray-300 rounded-lg"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'Scanner',
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isAuthenticated = ref(false)
    const errorMessage = ref('')

    const checkAuth = async () => {
      const auth0 = useAuth0()
      while (auth0.isLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      isAuthenticated.value = auth0.isAuthenticated.value
      if (!isAuthenticated.value) {
        console.log('Usuario no autenticado. Redirigiendo al login...')
        auth0.loginWithRedirect()
      }
    }

    // Función para validar UUID
    const isValidUUID = (str) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      return uuidRegex.test(str)
    }

    const onDetect = (result) => {
      try {
        const detectedValue = result[0]?.rawValue

        // Verificar si hay un valor detectado
        if (!detectedValue) {
          errorMessage.value = 'No se pudo leer el código QR'
          return
        }

        // Limpiar el valor detectado de cualquier espacio en blanco
        const cleanValue = detectedValue.trim()

        // Validar que sea un UUID válido
        if (!isValidUUID(cleanValue)) {
          errorMessage.value = 'Código QR inválido. Por favor, escanee un código válido.'
          console.error('QR inválido detectado:', cleanValue)
          return
        }

        // Si todo está bien, redirigir a la página de la orden
        console.log('UUID válido detectado:', cleanValue)
        router.push(`/order/${cleanValue}`)

      } catch (error) {
        console.error('Error al procesar el código QR:', error)
        errorMessage.value = 'Error al procesar el código QR. Por favor, intente nuevamente.'
      }
    }

    const goBack = () => {
      router.push('/admin')
    }

    onMounted(() => {
      checkAuth()
      // Verificar si hay un mensaje de error en la URL
      if (route.query.error) {
        errorMessage.value = route.query.error
        // Limpiar el error de la URL
        router.replace({ query: null })
      }
    })

    return {
      isAuthenticated,
      errorMessage,
      onDetect,
      goBack
    }
  }
}
</script>

<style>
.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>