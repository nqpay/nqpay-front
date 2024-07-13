<template>
  <div class="p-8 flex flex-col bg-[#1C1C1E] w-screen h-screen text-black pt-20">
    <template v-if="isAuthenticated">
      <h1 class="text-white font-medium text-xl">Hola {{ user.name }}!</h1>
      <div class="h-20"></div>
      <button @click="openScanner" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Escanear nuevo código QR</button>
      <button @click="logout()" class="bg-[#BE38F3] mt-5 w-full text-white rounded-lg p-3">Cerrar Sesión</button>
    </template>
    <template v-else>
      <!-- Skeleton loader -->
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 rounded w-3/4"></div>
        <div class="h-20"></div>
        <div class="h-12 bg-gray-300 rounded w-full p-3"></div>
        <div class="h-12 bg-gray-300 rounded w-full mt-5 p-3"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  name: 'Admin',
  data() {
    return {
      isAuthenticated: false,
      user: null,
      auth0Client: null,
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
        this.auth0Client = auth0
      }
    },
    openScanner() {
      this.$router.push('/scanner')
    },
    logout() {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: 'https://pay.nqpay.lat/admin',
        },
      })
    },
  },
}
</script>
