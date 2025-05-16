<template>
  <div v-if="isAuthenticated && order">
    <div class="min-h-screen bg-black text-white px-4 pt-6 pb-28 flex flex-col gap-6 relative">
      <!-- Banners -->
      <Transition name="fade">
        <div v-if="errorMessage" class="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 z-50 flex justify-between items-center">
          <span class="text-sm">{{ errorMessage }}</span>
          <button @click="errorMessage = ''">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showSuccess" class="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 z-50 flex justify-between items-center">
          <span class="text-sm">Pedido marcado como entregado exitosamente</span>
          <button @click="showSuccess = false">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Transition>

      <!-- Cabecera -->
      <div class="flex flex-col gap-1">
        <button @click="goToScanner" class="w-max text-sm text-white opacity-70 flex items-center gap-2"><img src="/arrowleft.svg" alt="Volver" class="h-5 w-5" /> Volver</button>
        <h1 class="text-xl font-bold">Orden {{ order.ticket_code.substring(0, 3) }}-{{ order.ticket_code.substring(3, 6) }}</h1>
        <p class="text-gray-400 text-sm">{{ order.created_at }}</p>
      </div>

      <!-- Lista de productos -->
      <div class="bg-white bg-opacity-10 rounded-lg p-4 flex flex-col gap-3">
        <div v-for="item in order.products" :key="item.name" class="flex justify-between text-sm md:text-base">
          <span>{{ item.name }}</span>
          <span class="font-semibold">{{ item.quantity }}</span>
        </div>
      </div>

      <!-- QR + precio -->
      <div class="flex flex-col items-center gap-3">
        <p class="font-semibold text-lg">Código QR para retiro</p>
        <div class="rounded-2xl bg-white p-3 flex justify-center">
          <QRCodeVue3
            v-if="order.ticket_code"
            :value="order.ticket_code"
            :width="140"
            :height="140"
            :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'L' }"
            :dotsOptions="{ type: 'square', color: '#000' }"
            :backgroundOptions="{ color: '#ffffff' }"
            :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            :cornersDotOptions="{ type: undefined, color: '#000000' }"
          />
        </div>
        <p class="text-lg font-bold">{{ order.ticket_code }}</p>
        <p class="text-white text-sm">${{ order.total }}</p>
      </div>

      <!-- Botón fijo abajo -->
      <div class="fixed bottom-0 left-0 right-0 px-4 py-3 bg-black z-40 flex gap-2">
        <button @click="goToScanner" class="bg-white bg-opacity-10 text-white rounded-lg w-1/5 h-12">
          <img src="/arrowleft.svg" class="mx-auto h-full w-5" />
        </button>
        <button
          class="rounded-lg w-4/5 h-12 text-sm font-semibold text-white"
          :class="order.order_status === 'DELIVERED' ? 'bg-red-500' : 'bg-green-500'"
          :disabled="isDelivering || order.order_status === 'DELIVERED'"
          @click="markAsDelivered"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-white text-center py-10">Cargando datos...</div>
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

    const buttonText = computed(() => {
      if (isDelivering.value) return 'Marcando como entregado...'
      if (order.value?.order_status === 'DELIVERED') return 'Pedido entregado'
      return 'Marcar pedido como entregado'
    })

    const fetchOrder = async (orderId) => {
      try {
        let venueName = window.location.hostname.split('.')[0]
        if (window.location.hostname === 'localhost' || window.location.hostname === 'pay-dev.nqpay.lat') {
          venueName = 'nq'
        }
        const response = await fetch(`https://api.nqpay.lat/venue/${venueName}/order/${orderId}/products`)
        if (response.ok) {
          const data = await response.json()

          // Validar campos requeridos
          if (!data.created_at || !data.ticket_code || !data.products || !Array.isArray(data.products) || data.products.length === 0) {
            router.push({
              path: '/scanner',
              query: { error: 'Pedido inválido o incompleto' },
            })
            return
          }

          // Si los datos son válidos, continuar con el procesamiento normal
          data.created_at = new Date(data.created_at).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })

          order.value = data
        } else {
          router.push({
            path: '/scanner',
            query: { error: 'Error al obtener el pedido' },
          })
        }
      } catch (error) {
        router.push({
          path: '/scanner',
          query: { error: 'Error de conexión' },
        })
      }
    }

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

    const markAsDelivered = async () => {
      if (!order.value || isDelivering.value || order.value.order_status === 'DELIVERED') return
      isDelivering.value = true
      errorMessage.value = ''

      try {
        const token = await getAccessTokenSilently()
        let venueName = window.location.hostname.split('.')[0]
        if (window.location.hostname === 'localhost' || window.location.hostname === 'pay-dev.nqpay.lat') {
          venueName = 'nq'
        }
        const response = await fetch(`https://api.nqpay.lat/venue/${venueName}/order/${route.params.id}/deliver`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        const result = await response.json()
        if (response.ok & (result.Status == 201)) {
          order.value = {
            ...order.value,
            order_status: 'DELIVERED',
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
        errorMessage.value = 'Este pedido ya fue entregado con anterioridad.'
      } finally {
        isDelivering.value = false
      }
    }

    const goToScanner = () => {
      router.push('/admin')
    }

    onMounted(() => {
      checkAuth()
      fetchOrder(route.params.id)
    })

    return {
      isAuthenticated,
      order,
      isDelivering,
      errorMessage,
      showSuccess,
      buttonText,
      markAsDelivered,
      goToScanner,
    }
  },
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
