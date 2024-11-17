<template>
  <div class="bg-[#F7F7FA] flex flex-col w-screen h-screen text-black relative">
    <!-- Back button - Positioned at the top -->
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

    <!-- Main content - Centered -->
    <div class="flex-1 flex justify-center items-center">
      <template v-if="isAuthenticated">
        <qrcode-stream @detect="onDetect"></qrcode-stream>
      </template>
      <template v-else>
        <!-- Skeleton loader -->
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
import { useRouter } from 'vue-router'

export default {
  name: 'Scanner',
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data() {
    return {
      isAuthenticated: false,
      user: null,
      pedido: false,
    }
  },
  created() {
    this.checkAuth()
  },
  methods: {
    async checkAuth() {
      const auth0 = useAuth0()

      // Esperar a que Auth0 termine de cargar
      while (auth0.isLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      this.isAuthenticated = auth0.isAuthenticated.value

      if (!this.isAuthenticated) {
        console.log('Usuario no autenticado. Redirigiendo al login...')
        auth0.loginWithRedirect()
      } else {
        this.user = auth0.user.value
        console.log('Usuario autenticado')
      }
    },
    onDetect(result) {
      const id = result[0].rawValue
      console.log('Detected ID:', id)
      this.$router.push(`/order/${id}`)
    },
    goBack() {
      this.$router.push('/admin')
    }
  },
}
</script>