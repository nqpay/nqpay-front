<template>
  <div v-if="isAuthenticated && order">
    <div class="min-h-screen bg-black text-white p-8 flex flex-col">
      <!-- Error Banner -->
      <div v-if="errorMessage" 
           class="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 animate-fade-in-down z-50 flex justify-between items-center">
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Success Banner -->
      <div v-if="showSuccess" 
           class="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 animate-fade-in-down z-50 flex justify-between items-center">
        <span>Pedido marcado como entregado exitosamente</span>
        <button @click="showSuccess = false" class="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="mb-4">
          <div class="h-16"></div>
          <h1 class="text-2xl font-bold">Orden</h1>
          <p class="text-gray-400">{{ currentDate }}</p>
        </div>

        <!-- Item list -->
        <div class="bg-white bg-opacity-10 rounded-lg p-4 flex-grow">
          <div v-for="item in order.products" :key="item.name" class="flex justify-between mb-2 font-bold text-xl px-4">
            <span>{{ item.name }}</span>
            <span>{{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivery button -->
    <div class="w-full flex fixed bottom-0 left-0 right-0 p-4 mb-20 font-bold text-xl text-black gap-2">
      <button @click="goToScanner" class="bg-white bg-opacity-10 text-white rounded-lg h-14 w-2/12 items-center">
        <img src="/arrowleft.svg" class="w-full p-5">
      </button>
      <button 
        v-if="order" 
        class="py-3 px-4 rounded-lg text-center h-14 w-10/12 text-sm"
        :class="{
          'bg-red-500 text-white': order.order_status === 'DELIVERED',
          'bg-green-500': order.order_status !== 'DELIVERED'
        }"
        @click="markAsDelivered"
        :disabled="isDelivering || order.order_status === 'DELIVERED'"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
  <div v-else>Cargando datos...</div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Order',
  setup() {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0()
    const route = useRoute()
    const router = useRouter()
    const order = ref(null)
    const isDelivering = ref(false)
    const errorMessage = ref('')
    const showSuccess = ref(false)

    const currentDate = computed(() => {
      return new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    })

    const buttonText = computed(() => {
      if (isDelivering.value) return 'Marcando como entregado...'
      if (order.value?.order_status === 'DELIVERED') return 'Pedido entregado'
      return 'Marcar pedido como entregado'
    })

    const fetchOrder = async (orderId) => {
      try {
        const response = await fetch(`https://api.nqpay.lat/orders/${orderId}/products`)
        if (response.ok) {
          const data = await response.json()
          order.value = data
        } else {
          errorMessage.value = 'Error al obtener el pedido. Por favor, intente nuevamente.'
        }
      } catch (error) {
        errorMessage.value = 'Error en la conexión. Por favor, verifique su conexión a internet.'
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
      if (!order.value || isDelivering.value || order.value.order_status === 'DELIVERED') return

      isDelivering.value = true
      errorMessage.value = ''
      
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`https://api.nqpay.lat/orders/${route.params.id}/deliver`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })

        if (response.ok) {
          const result = await response.json()
          console.log('result: ', result)
          order.value = {
            ...order.value,
            order_status: 'DELIVERED'
          }
          showSuccess.value = true
          setTimeout(() => {
            showSuccess.value = false
          }, 3000) // El mensaje de éxito desaparece después de 3 segundos
        } else {
          const errorData = await response.json()
          errorMessage.value = errorData.detail || 'Error al marcar como entregado. Por favor, intente nuevamente.'
        }
      } catch (error) {
        errorMessage.value = 'Error en la conexión. Por favor, verifique su conexión a internet.'
      } finally {
        isDelivering.value = false
      }
    }

    const goToScanner = () => {
      router.push('/scanner')
    }

    onMounted(() => {
      checkAuth()
      fetchOrder(route.params.id)
    })

    return {
      isAuthenticated,
      order,
      currentDate,
      isDelivering,
      errorMessage,
      showSuccess,
      buttonText,
      markAsDelivered,
      goToScanner,
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