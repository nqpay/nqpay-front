<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center text-white">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <a class="text-xl font-semibold"></a>
      <div class="h-7 w-7"></div>
    </div>
    <div v-if="!isLoading" class="h-full">
      <div class="h-10"></div>
      <div class="flex justify-between">
        <p class="text-2xl font-bold">Tu Pedido</p>
        <div
          class="rounded-lg px-2 py-1 items-center flex"
          :class="{
            'bg-yellow-500': order.order_status === 'CREATED',
            'bg-[#8419C5]': order.order_status === 'PAID',
            'bg-blue-500': order.order_status === 'NOTIFIED',
            'bg-green-500': order.order_status === 'DELIVERED',
          }"
        >
          <p v-if="order.order_status === 'CREATED'">Procesando Pago</p>
          <p v-else-if="order.order_status === 'PAID'">En Preparación</p>
          <p v-else-if="order.order_status === 'NOTIFIED'">Ir a Retirar</p>
          <p v-else-if="order.order_status === 'DELIVERED'">Entregado</p>
        </div>
      </div>
      <div class="pt-1"></div>

      <!-- Status messages -->
      <div v-if="order.order_status === 'CREATED'" class="mt-2 space-y-4">
        <p class="text-yellow-400 font-medium">Estamos procesando tu pago con Mercado Pago</p>
        <p>Tu orden será confirmada en breve. Por favor, no cierres esta ventana mientras procesamos tu pago.</p>
        <p>El código QR para retirar tu orden, aparecerá aquí una vez que tu trago este listo para retirar!</p>
        <p class="text-sm text-gray-400">Este proceso puede tomar unos segundos. La página se actualizará automáticamente cuando tu pago sea confirmado.</p>
        <div class="flex items-center justify-center pt-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
      <p class="mt-2" v-else-if="order.order_status === 'PAID'">
        Tu pedido fue recibido y esta preparandose en la barra, te notificaremos por whatsapp y SMS cuando este listo para retirar.
      </p>
      <p class="mt-2" v-else-if="order.order_status === 'NOTIFIED'">Acercate a la barra a retirar tu pedido</p>
      <p class="mt-2" v-else-if="order.order_status === 'DELIVERED'">Este pedido ya ha sido entregado</p>

      <div class="justify-center pb-40 flex h-full flex-col">
        <div class="flex w-full flex-col items-center justify-center">
          <div class="self-center flex flex-col items-center">
            <!-- <p v-if="order.order_status === 'CREATED'" class="text-2xl font-medium pb-5 text-center">
              El código QR para retirar tu orden, aparecerá aquí una vez que tu trago este listo para retirar!
            </p> -->
            <p v-if="order.order_status === 'PAID'" class="text-2xl font-medium pb-5 text-center">Obtendras un código QR para retiro cuando el pedido este listo!</p>
            <p v-else-if="order.order_status === 'NOTIFIED' || order.order_status === 'DELIVERED'" class="text-2xl font-medium pb-5">Código QR para retiro</p>

            <div v-if="order.order_status === 'NOTIFIED' || order.order_status === 'DELIVERED'" class="rounded-2xl p-2 bg-white w-fit">
              <QRCodeVue3
                v-if="route.query.external_reference"
                :value="route.query.external_reference"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'L' }"
                :dotsOptions="{ type: 'square', color: '#000' }"
                :backgroundOptions="{ color: '#ffffff' }"
                :cornersSquareOptions="{ type: 'square', color: '#000000' }"
                :cornersDotOptions="{ type: undefined, color: '#000000' }"
                :width="250"
                :height="250"
                fileExt="png"
                imgclass="img-qr"
              />
            </div>
            <div class="flex flex-col">
              <p v-if="order.ticket_code && order.order_status != 'CREATED'" class="text-center font-bold text-xl pt-3">
                {{ order.ticket_code.substring(0, 3) }}-{{ order.ticket_code.substring(3, 6) }}
              </p>
              <p v-if="order.order_status != 'CREATED'" class="pt-5">
                ${{
                  order.total
                    .toString()
                    .split('.')[0]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }}
              </p>
              <div v-if="order.order_status != 'CREATED'" v-for="item in order.products">
                <p class="font-bold">{{ item.quantity }}x {{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-full">
      <!-- Skeleton Loading -->
      <div class="h-10"></div>
      <div class="flex justify-between">
        <div class="h-8 w-32 bg-gray-600 rounded animate-pulse"></div>
        <div class="h-8 w-24 bg-gray-600 rounded animate-pulse"></div>
      </div>
      <div class="mt-2 h-6 w-64 bg-gray-600 rounded animate-pulse"></div>
      <div class="justify-center pb-40 flex h-full flex-col">
        <div class="flex w-full flex-col items-center">
          <div class="h-8 w-48 bg-gray-600 rounded animate-pulse mb-5"></div>
          <div class="h-64 w-64 bg-gray-600 rounded-2xl animate-pulse"></div>
          <div class="h-6 w-24 bg-gray-600 rounded animate-pulse mt-5"></div>
          <!-- Product items skeleton -->
          <div class="w-48 space-y-3 mt-3">
            <div class="h-6 w-full bg-gray-600 rounded animate-pulse"></div>
            <div class="h-6 w-full bg-gray-600 rounded animate-pulse"></div>
            <div class="h-6 w-full bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
    <NavBar currentView="Checkout" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { onMounted, ref, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import QRCodeVue3 from 'qrcode-vue3'
import NavBar from './NavBar.vue'

const isLoading = ref(true)
const order = ref(null)
const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const websocket = ref(null)
const timeoutId = ref(null)
const currentBackoff = ref(5000) // Empezamos con 5 segundos
const maxBackoff = 60000 // Máximo 1 minuto
const isPolling = ref(false)
const lastPollTime = ref(0) // Nuevo: Guardamos el timestamp del último poll

// Función para verificar si la pestaña está activa
const isTabActive = () => !document.hidden

async function pollOrderStatus() {
  if (!isPolling.value || !isTabActive()) return

  try {
    lastPollTime.value = Date.now() // Guardamos el timestamp del poll actual

    const auth = getAuth()
    const idToken = await auth.currentUser.getIdToken()
    let venueName = window.location.hostname.split('.')[0]
    if (window.location.hostname === 'localhost') {
      venueName = 'nq'
    }

    const response = await fetch(`https://api.nqpay.lat/venue/${venueName}/order/${route.query.external_reference}/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      order.value = data

      if (data.order_status !== 'CREATED') {
        stopPolling()
        await connectWebSocket()
        return
      }

      currentBackoff.value = Math.min(currentBackoff.value * 2, maxBackoff)

      if (isPolling.value) {
        timeoutId.value = setTimeout(pollOrderStatus, currentBackoff.value)
      }
    }
  } catch (error) {
    console.error('Error polling order status:', error)
    currentBackoff.value = Math.min(currentBackoff.value * 2, maxBackoff)
    if (isPolling.value) {
      timeoutId.value = setTimeout(pollOrderStatus, currentBackoff.value)
    }
  }
}

function startPolling() {
  if (isPolling.value) return // Evitar iniciar si ya está polling

  const now = Date.now()
  const timeSinceLastPoll = now - lastPollTime.value

  if (timeSinceLastPoll < currentBackoff.value) {
    // Si no ha pasado suficiente tiempo, esperamos la diferencia
    const timeToWait = currentBackoff.value - timeSinceLastPoll
    timeoutId.value = setTimeout(() => {
      isPolling.value = true
      pollOrderStatus()
    }, timeToWait)
  } else {
    // Si ya pasó suficiente tiempo, hacemos poll inmediatamente
    isPolling.value = true
    pollOrderStatus()
  }
}

function stopPolling() {
  isPolling.value = false
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopPolling()
  } else if (order.value?.order_status === 'CREATED') {
    startPolling() // Ahora respeta el tiempo transcurrido
  }
}

async function connectWebSocket() {
  try {
    const auth = getAuth()
    const idToken = await auth.currentUser.getIdToken()
    const wsUrl = `https://jqxxikk287.execute-api.sa-east-1.amazonaws.com/prod/?token=${idToken}`

    websocket.value = new WebSocket(wsUrl)

    websocket.value.onopen = () => {
      console.log('WebSocket connection established')
    }

    websocket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.orderId && order.value.id === data.orderId && data.status === 'DELIVERED') {
          order.value.order_status = 'DELIVERED'
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    websocket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    websocket.value.onclose = () => {
      console.log('WebSocket connection closed')
    }
  } catch (error) {
    console.error('Error setting up WebSocket:', error)
  }
}

onMounted(async () => {
  if ((route.query.preference_id != null) & (route.query.payment_id != null)) {
    cartStore.clearCart()
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)

  const order_id = route.query.external_reference
  if (order_id) {
    try {
      const auth = getAuth()
      const idToken = await auth.currentUser.getIdToken()
      let venueName = window.location.hostname.split('.')[0]
      if (window.location.hostname === 'localhost') {
        venueName = 'nq'
      }

      const response = await fetch(`https://api.nqpay.lat/venue/${venueName}/order/${order_id}/products`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        order.value = data
        isLoading.value = false
        order.value.id = order_id

        if (data.order_status === 'CREATED' && isTabActive()) {
          lastPollTime.value = Date.now() // Inicializamos el timestamp con la primera llamada
          startPolling()
        } else {
          await connectWebSocket()
        }
      } else {
        console.error('Error al obtener el pedido:', response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message)
    }
  }
})

onUnmounted(() => {
  stopPolling()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  if (websocket.value) {
    websocket.value.close()
  }
})

function goBack() {
  router.push('/checkout')
}
</script>
