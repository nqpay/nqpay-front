<template>
  <div class="bg-[#F7F7FA] flex justify-center items-center w-screen h-screen text-black">
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
      const id = result[0].rawValue.split('O#')[1]
      console.log('Detected ID:', id)
      this.$router.push(`/order/${id}`)
    },
  },
}
</script>
