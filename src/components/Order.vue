<template>
  <div v-if="isAuthenticated && order">
    <div class="min-h-screen bg-black text-white p-8 flex flex-col">
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="mb-4">
          <div class="h-16"></div>
          <h1 class="text-2xl font-bold">Orden</h1>
          <p class="text-gray-400">{{ currentDate }}</p>
        </div>

        <!-- Item list -->
        <div class="bg-white bg-opacity-10 rounded-lg p-4 flex-grow">
          <div v-for="item in order.items" :key="item.name" class="flex justify-between mb-2 font-bold text-xl px-4">
            <span>{{ item.name }}</span>
            <span>{{ item.quantity }}</span>
          </div>
        </div>
      </div>

    </div>
    <!-- Delivery button -->
    <div class="w-full flex fixed bottom-0 left-0 right-0 p-4 mb-20 font-bold text-xl text-black gap-2">
      <button class="bg-white bg-opacity-10 text-white rounded-lg h-14 w-2/12 items-center">
        <img src="/arrowleft.svg" class="w-full p-5">
      </button>
      <button v-if="order" class="py-3 px-4 rounded-lg text-center h-14 w-10/12 text-sm"
        :class="order.status === 'DELIVERED' ? 'bg-red-500 w-3/4 text-white' : 'bg-green-500'" @click="markAsDelivered"
        :disabled="isDelivering || order.status === 'DELIVERED'">
        {{ isDelivering ? 'Marcando como entregado...' : order.status === 'DELIVERED' ? 'Pedido entregado' : 'Marcar pedido como entregado' }}
      </button>
    </div>
  </div>
  <div v-else>Cargando datos...</div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Order',
  setup() {
    const auth0 = useAuth0()
    const route = useRoute()
    const order = ref(null)
    const isDelivering = ref(false)
    const isAuthenticated = ref(false)

    const currentDate = computed(() => {
      return new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    })

    const fetchOrder = async (orderId) => {
      try {
        const response = await fetch(`https://api.nqpay.lat/checkout/${orderId}`)
        if (response.ok) {
          const data = await response.json()
          order.value = data
          console.log(order.value)
        } else {
          console.error('Error al obtener el pedido:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
      }
    }

    const checkAuth = async () => {
      while (auth0.isLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      isAuthenticated.value = auth0.isAuthenticated.value

      if (!isAuthenticated.value) {
        console.log('Usuario no autenticado. Redirigiendo al login...')
        auth0.loginWithRedirect()
      }
    }

    const markAsDelivered = async () => {
      if (!order.value || isDelivering.value || order.value.status === 'DELIVERED') return

      isDelivering.value = true
      try {
        const response = await fetch(`https://api.nqpay.lat/orders/${route.params.id}/deliver`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          await response.json()
          order.value.status = 'DELIVERED'
        } else {
          const errorData = await response.json()
          console.error('Error al marcar como entregado:', errorData.detail)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message)
      } finally {
        isDelivering.value = false
      }
    }

    onMounted(() => {
      console.log("FETCH ORDER!!")
      checkAuth()
      fetchOrder(route.params.id)
    })

    return {
      isAuthenticated,
      order,
      currentDate,
      isDelivering,
      markAsDelivered,
    }
  }
}
</script>