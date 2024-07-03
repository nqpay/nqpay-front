<template>
  <Suspense>
    <div v-if="isAuthenticated" class="bg-[#F7F7FA] flex justify-center items-center relative z-0 w-screen h-screen text-black">
      <h1>HOALA</h1>
      <div v-if="this.pedido" class="absolute z-10 w-2/3 h-2/3 bg-white rounded-lg p-4 text-xl flex flex-col gap-2">
        <div class="flex justify-between mb-5">
          <p class="font-bold">Pedido #1</p>
          <button @click="this.pedido = false" class="">
            <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="100" x2="100" y2="0" stroke-width="10" stroke="black" />
              <line x1="0" y1="0" x2="100" y2="100" stroke-width="10" stroke="black" />
            </svg>
          </button>
        </div>
        <div class="flex justify-between font-bold">
          <p>Item</p>
          <p>Cantidad</p>
        </div>
        <div class="flex justify-between">
          <p>Cerveza Corona</p>
          <p>1</p>
        </div>
        <div class="flex justify-between">
          <p>Ron con Coca</p>
          <p>1</p>
        </div>
        <div class="flex justify-between">
          <p>Vodka con Jugo</p>
          <p>1</p>
        </div>
      </div>

      <qrcode-stream @detect="onDetect"></qrcode-stream>
      <!-- <button @click="logout" class="bg-[#BE38F3] text-white rounded-lg p-2">Logout</button> -->
    </div>
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Admin',
  async setup() {
    const auth0 = useAuth0()
    if (auth0.isLoading) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
    if (!auth0.isAuthenticated.value && auth0.isLoading) {
      if (auth0.isLoading) console.log('loading')
      console.log('must login')
      auth0.loginWithRedirect()
    }
    console.log(auth0.isAuthenticated.value)
    if (auth0.isAuthenticated.value) {
      console.log('logged in')
    }
    return {
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      user: auth0.user,
      logout() {
        auth0.logout({
          logoutParams: {
            returnTo: 'https://nqpay.lat/',
          },
        })
      },
    }
  },
  data() {
    return {
      pedido: false,
    }
  },
  methods: {
    onDetect(result) {
      this.pedido = true
      console.log(result)
    },
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
}
</script>
