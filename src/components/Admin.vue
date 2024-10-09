<template>
  <div class="p-8 flex flex-col bg-[#1C1C1E] w-screen h-screen text-black pt-20">
    <template v-if="isAuthenticated">
      <h1 class="text-white font-medium text-xl">Hola {{ user?.name }}!</h1>
      <div class="h-20"></div>
      <button @click="openScanner" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Escanear nuevo código QR</button>
      <button @click="handleLogout" class="bg-[#BE38F3] mt-5 w-full text-white rounded-lg p-3">Cerrar Sesión</button>
    </template>
    <template v-else-if="isLoading">
      <!-- Skeleton loader -->
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 rounded w-3/4"></div>
        <div class="h-20"></div>
        <div class="h-12 bg-gray-300 rounded w-full p-3"></div>
        <div class="h-12 bg-gray-300 rounded w-full mt-5 p-3"></div>
      </div>
    </template>
    <template v-else>
      <div class="text-center">
        <h2 class="text-white font-medium text-xl mb-4">Bienvenido</h2>
        <button @click="handleLogin" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">
          Iniciar Sesión
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Admin',
  setup() {
    const auth0 = useAuth0()
    const router = useRouter()
    const isAuthenticated = ref(false)
    const isLoading = ref(true)
    const user = ref(null)

    const checkAuth = async () => {
      try {
        // Wait for Auth0 to initialize
        while (auth0.isLoading.value) {
          await new Promise((resolve) => setTimeout(resolve, 50))
        }

        isAuthenticated.value = auth0.isAuthenticated.value

        if (isAuthenticated.value) {
          const token = await auth0.getAccessTokenSilently()
          console.log('Token obtenido:', token)
          user.value = auth0.user.value
        }
      } catch (error) {
        console.error('Error en la autenticación:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleLogin = () => {
      auth0.loginWithRedirect({
        appState: { targetUrl: window.location.pathname }
      })
    }

    const openScanner = () => {
      router.push('/scanner')
    }

    const handleLogout = () => {
      auth0.logout({
        logoutParams: {
          returnTo: window.location.origin + '/admin',
        },
      })
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      isAuthenticated,
      isLoading,
      user,
      openScanner,
      handleLogin,
      handleLogout,
    }
  },
}
</script>