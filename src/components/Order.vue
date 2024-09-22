<template>
  <div class="min-h-screen bg-black text-white p-8 flex flex-col">
    <div v-if="isAuthenticated && order" class="h-full flex flex-col">
      <!-- Cabecera -->
      <div class="mb-4">
        <div class="h-16"></div>
        <h1 class="text-2xl font-bold">Orden</h1>
        <p class="text-gray-400">{{ currentDate }}</p>
      </div>

      <!-- Lista de items -->
      <div class="bg-white bg-opacity-10 rounded-lg p-4 flex-grow">
        <div v-for="item in order.items" :key="item.name" class="flex justify-between mb-2 font-bold text-xl px-4">
          <span>{{ item.name }}</span>
          <span>{{ item.quantity }}</span>
        </div>
      </div>
    </div>
    <div v-else>Cargando datos...</div>
  </div>
  <!-- <NavBar currentView="Checkout" /> -->
  <!-- Botón de entrega -->
  <div class="w-full flex fixed bottom-0 left-0 right-0 p-4 mb-20 font-bold text-xl text-black gap-2">
    <button class="bg-white bg-opacity-10 text-white rounded-lg h-14 w-2/12 items-center">
      <img src="/arrowleft.svg" class="w-full p-5">
    </button>
    <button
      v-if="order"
      class="py-3 px-4 rounded-lg text-center h-14 w-10/12 text-sm "
      :class="order.status === 'DELIVERED' ? 'bg-red-500 w-3/4 text-white' : 'bg-green-500'"
      @click="markAsDelivered"
      :disabled="isDelivering || order.status === 'DELIVERED'"
    >
      {{ isDelivering ? 'Marcando como entregado...' : order.status === 'DELIVERED' ? 'Pedido entregado' : 'Marcar pedido como entregado' }}
    </button>
  </div>
</template>

<script >
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './NavBar.vue'


const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
})


export default {
  name: 'Order',
  data() {
    return {
      isAuthenticated: false,
      user: null,
      auth0Client: null,
      order: ref(null),
      route: useRoute(),
      isDelivering: ref(false)
    }
  },
  created() {
    this.checkAuth()
  },
  onMounted() {
    console.log("FETCH ORDER!!")
    // Fetch order data on component mount
    fetchOrder(route.params.id)
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

    async fetchOrder(orderId) {
      try {
        const response = await fetch(`https://api.nqpay.lat/checkout/${orderId}`)
        if (response.ok) {
          const data = await response.json()
          this.order.value = data
          console.log(this.order.value)
        } else {
          console.error('Error al obtener el pedido:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
      }
    },

    async markAsDelivered() {
      if (!order.value || isDelivering.value || order.value.status === 'DELIVERED') return

      isDelivering.value = true
      try {
        const response = await fetch(`https://api.nqpay.lat/orders/${route.params.id}/deliver`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Aquí deberías incluir el token de autenticación cuando implementes la autenticación
            // 'Authorization': `Bearer ${token}`
          },
        })

        if (response.ok) {
          const result = await response.json()
          // Actualizar el estado de la orden localmente
          order.value.status = 'DELIVERED'
          // Aquí podrías mostrar un mensaje de éxito al usuario
        } else {
          const errorData = await response.json()
          console.error('Error al marcar como entregado:', errorData.detail)
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        isDelivering.value = false
      }
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
