<template>
  <div class="bg-[#1E1E1E] min-h-screen p-4 text-white gap-1 flex flex-col pt-10">
    <div class="flex justify-between">
      <h1 class="text-2xl">Ordenes</h1>
      <button v-if="isAuthenticated" v-on:click="fetchOrders">
        <svg
          fill="#ffffff"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 489.645 489.645"
          xml:space="preserve"
          class="w-6 h-6 rotate-90"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"
              ></path>
            </g>
          </g>
        </svg>
      </button>
    </div>

    <div class="mt-2 flex rounded-full">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 flex items-center ps-5 pointer-events-none">
          <img src="/loop.png" class="w-6 h-6" />
        </div>
        <input
          type="search"
          id="default-search"
          v-model="searchQuery"
          @input="filterOrders"
          class="block rounded-full w-full p-4 ps-14 text-md text-white placeholder:text-white bg-[#2F2E2F]"
          placeholder="Buscar por código"
        />
      </div>
    </div>

    <div class="mt-2 flex gap-2">
      <button v-on:click="view = 'recent'" :class="view == 'recent' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'" class="px-4 py-2 rounded-full">
        📜 Recientes
      </button>
      <button
        v-on:click="view = 'delivered'"
        :class="view == 'delivered' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'"
        class="border border-white px-4 py-2 rounded-full"
      >
        📑 Entregadas
      </button>
    </div>

    <div v-if="isAuthenticated" class="mt-4 space-y-4 pb-20">
      <!-- Recent Orders View -->
      <div v-if="view == 'recent'">
        <div v-if="isLoading" v-for="i in 3" :key="'skeleton-recent-' + i" class="mb-2 bg-[#2A2A2A] text-black p-4 rounded-xl shadow-lg animate-pulse">
          <div class="flex justify-between items-center">
            <div>
              <div class="h-5 w-32 bg-gray-600 rounded mb-2"></div>
              <div class="h-3 w-24 bg-gray-700 rounded"></div>
            </div>
            <div class="h-8 w-20 bg-gray-600 rounded-full"></div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2">
            <div v-for="j in 2" :key="'item-recent-' + i + '-' + j" class="flex items-center gap-2">
              <div class="w-12 h-12 rounded-lg bg-gray-700"></div>
              <div>
                <div class="h-4 w-20 bg-gray-600 rounded mb-1"></div>
                <div class="h-3 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="filteredRecentOrders.length === 0" class="text-center py-8">
          <p class="text-gray-400">No hay órdenes recientes que coincidan con la búsqueda</p>
        </div>
        <div v-else v-for="order in filteredRecentOrders" :key="order.id" class="mb-2 relative">
          <div
            class="bg-[#F7F3FA] text-black p-4 rounded-xl shadow-lg transition-all duration-1000"
            :class="{
              'translate-y-full opacity-0 z-10': notifyingOrders[order.id] && order.status === 'NOTIFIED',
              'scale-95 bg-gray-500': notifyingOrders[order.id] && order.status !== 'NOTIFIED',
            }"
            :style="notifyingOrders[order.id] && order.status === 'NOTIFIED' ? 'position: absolute; width: 100%;' : ''"
          >
            <div class="flex justify-between items-center">
              <div>
                <h2 class="font-semibold">Orden #{{ order.ticket_code.slice(0, 3) }}-{{ order.ticket_code.slice(3, 6) }}</h2>
                <p class="text-gray-600 text-sm">{{ formatRelativeTime(order.created_at) }}</p>
              </div>
              <button
                v-if="order.status == 'PAID'"
                v-on:click="notify(order.id)"
                class="bg-[#1E1E1E] text-white px-5 py-2 text-xs rounded-full transition-colors"
                :disabled="notifyingOrders[order.id]"
                :class="{ 'opacity-50 bg-gray-500': notifyingOrders[order.id] }"
              >
                <span v-if="notifyingOrders[order.id]">Notificando...</span>
                <span v-else>Notificar</span>
              </button>
              <button v-if="order.status == 'NOTIFIED'" class="bg-white text-black border border-black px-5 py-2 text-xs rounded-full">Notificado</button>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <div v-for="item in order.products" :key="item.name" class="flex items-center gap-2">
                <img :src="item.image_url" alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p class="font-medium">{{ item.quantity }}x {{ item.name }}</p>
                  <p class="text-gray-600 text-xs">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivered Orders View -->
      <div v-if="view == 'delivered'">
        <div v-if="filteredDeliveredOrders.length === 0" class="text-center py-8">
          <p class="text-gray-400">No hay órdenes entregadas que coincidan con la búsqueda</p>
        </div>
        <div v-else v-for="order in filteredDeliveredOrders" :key="order.id" class="mb-2">
          <div class="bg-[#F7F3FA] text-black p-4 rounded-xl shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="font-semibold">Orden #{{ order.ticket_code.slice(0, 3) }}-{{ order.ticket_code.slice(3, 6) }}</h2>
                <p class="text-gray-600 text-sm">{{ formatRelativeTime(order.created_at) }}</p>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <div v-for="item in order.products" :key="item.name" class="flex items-center gap-2">
                <img :src="item.image_url" alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p class="font-medium">{{ item.quantity }}x {{ item.name }}</p>
                  <p class="text-gray-600 text-xs">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login View (Only shown when not authenticated and not loading) -->
    <div v-if="!isAuthenticated && !isLoading" class="flex justify-center items-center min-h-screen bg-[#1E1E1E] p-4 absolute inset-0">
      <div class="text-center w-full max-w-md">
        <h2 class="text-white font-medium text-xl mb-4">Bienvenido</h2>
        <button @click="handleLogin" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Iniciar Sesión</button>
      </div>
    </div>

    <!-- Barra de navegación -->
    <AdminNavBar v-if="isAuthenticated" :active-page="'orders'" />
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import AdminNavBar from './AdminNavBar.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  components: { AdminNavBar },
  setup() {
    // const websocket = ref(null)
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading: auth0IsLoading } = useAuth0()
    const recentOrders = ref([])
    const deliveredOrders = ref([])
    const view = ref('recent')
    const isLoading = ref(true)
    const reconnectAttempts = ref(0)
    const maxReconnectAttempts = 5
    const reconnectTimeout = ref(null)
    const baseReconnectDelay = 1000 // 1 segundo inicial
    const searchQuery = ref('') // Variable para almacenar la consulta de búsqueda
    const filteredRecentOrders = ref([]) // Variable para almacenar órdenes recientes filtradas
    const filteredDeliveredOrders = ref([]) // Variable para almacenar órdenes entregadas filtradas
    const longPollingTimeout = ref(null)
    const isPolling = ref(false)
    const notifyingOrders = ref({})

    // Long polling implementation
    const startLongPolling = async () => {
      if (!isAuthenticated.value || isPolling.value) return

      isPolling.value = true
      try {
        const token = await getAccessTokenSilently()
        const response = await fetch('https://api.nqpay.lat/get-orders-real-time', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data && data.Body) {
            data.Body.forEach((message) => {
              if (message.Body) {
                try {
                  // Parse the Body string into an object
                  const orderData = JSON.parse(message.Body)
                  for (const product of orderData.products) {
                    product.image_url = product.picture_url
                  }

                  // Check if this order already exists in recentOrders
                  const orderExists = recentOrders.value.some((order) => order.id === orderData.id)
                  if (!orderExists && orderData.status !== 'DELIVERED') {
                    console.log('Adding new order:', orderData.id)
                    recentOrders.value.unshift(orderData)
                  }
                } catch (parseError) {
                  console.error('Error parsing order data:', parseError)
                }
              }
            })
            // const ordersDatas = JSON.parse(data)
            // const orderData = ordersDatas.Body
            // console.log('orderData: ', orderData)
            // console.log('orderData.Body: ', orderData)
            // // Only add to recentOrders if it's not already there
            // if (!recentOrders.value.some((order) => order.id === orderData.id)) {
            //   console.log('orderData: ', orderData.id)
            //   recentOrders.value.unshift(orderData)
            //   // Update filtered orders
            filterOrders()
            // }
          }
        }
      } catch (error) {
        console.error('Long polling error:', error)
      } finally {
        isPolling.value = false
        // Continue polling after a short delay
        longPollingTimeout.value = setTimeout(startLongPolling, 1000)
      }
    }

    // const filterOrders = () => {
    //   const query = searchQuery.value.toLowerCase().trim()

    //   if (query === '') {
    //     // Si no hay consulta, mostrar todas las órdenes
    //     filteredRecentOrders.value = [...recentOrders.value]
    //     filteredDeliveredOrders.value = [...deliveredOrders.value]
    //   } else {
    //     // Filtrar órdenes por código que contenga la consulta
    //     filteredRecentOrders.value = recentOrders.value.filter((order) => order.ticket_code.toLowerCase().includes(query))
    //     filteredDeliveredOrders.value = deliveredOrders.value.filter((order) => order.ticket_code.toLowerCase().includes(query))
    //   }
    // }

    const filterOrders = () => {
      const query = searchQuery.value.toLowerCase().trim()

      const sortOrders = (orders) => {
        return [...orders].sort((a, b) => {
          // Sort by status first (NOTIFIED goes to the bottom)
          if (a.status === 'NOTIFIED' && b.status !== 'NOTIFIED') return 1
          if (a.status !== 'NOTIFIED' && b.status === 'NOTIFIED') return -1

          // If status is the same, sort by creation date (newest first)
          return new Date(b.created_at) - new Date(a.created_at)
        })
      }

      if (query === '') {
        filteredRecentOrders.value = sortOrders(recentOrders.value)
        filteredDeliveredOrders.value = sortOrders(deliveredOrders.value)
      } else {
        filteredRecentOrders.value = sortOrders(recentOrders.value.filter((order) => order.ticket_code.toLowerCase().includes(query)))
        filteredDeliveredOrders.value = sortOrders(deliveredOrders.value.filter((order) => order.ticket_code.toLowerCase().includes(query)))
      }
    }

    const formatRelativeTime = (timestamp) => {
      const now = new Date()
      const createdAt = new Date(timestamp)
      const diffInSeconds = Math.floor((now - createdAt) / 1000)
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      if (diffInMinutes < 1) diffInMinutes = 1
      const diffInHours = Math.floor(diffInMinutes / 60)
      const diffInDays = Math.floor(diffInHours / 24)

      // Less than a minute: show seconds
      if (diffInMinutes < 1) {
        return `${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`
      }

      // Less than an hour: show minutes
      if (diffInHours < 1) {
        return `${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`
      }

      // Less than 24 hours: show time
      if (diffInDays < 1) {
        return createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }

      // More than 24 hours: show days ago
      return `${diffInDays} día${diffInDays !== 1 ? 's' : ''} atrás`
    }

    const fetchOrders = async () => {
      isLoading.value = true
      try {
        if (!isAuthenticated.value) return

        let venueName = window.location.hostname.split('.')[0]
        if (window.location.hostname === 'localhost') {
          venueName = 'nq'
        }

        const token = await getAccessTokenSilently()
        const response = await fetch(`https://api.nqpay.lat/venues/${venueName}/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          recentOrders.value = data.orders.filter((order) => order.status !== 'DELIVERED') || []
          deliveredOrders.value = data.orders.filter((order) => order.status === 'DELIVERED') || []

          // Aplicar filtro inicial después de cargar datos
          filterOrders()
        } else {
          console.error('Failed to fetch orders')
          recentOrders.value = []
          deliveredOrders.value = []
          filteredRecentOrders.value = []
          filteredDeliveredOrders.value = []
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        recentOrders.value = []
        deliveredOrders.value = []
        filteredRecentOrders.value = []
        filteredDeliveredOrders.value = []
      } finally {
        isLoading.value = false
      }
    }

    const notify = async (orderID) => {
      try {
        if (!isAuthenticated.value) return

        // Set notifying state
        notifyingOrders.value[orderID] = true

        let venueName = window.location.hostname.split('.')[0]
        if (window.location.hostname === 'localhost') {
          venueName = 'nq'
        }

        const response = await fetch(`https://api.nqpay.lat/orders/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: orderID,
            venueName: venueName,
            type: 'ready',
          }),
        })

        if (response.ok) {
          console.log('Notification sent successfully')
          const orderIndex = recentOrders.value.findIndex((order) => order.id === orderID)
          if (orderIndex !== -1) {
            await new Promise((resolve) => setTimeout(resolve, 500))

            recentOrders.value[orderIndex] = {
              ...recentOrders.value[orderIndex],
              status: 'NOTIFIED',
            }

            filterOrders()
          }
        } else {
          console.error('Failed to send notification')
        }
      } catch (error) {
        console.error('Error sending notification:', error)
      } finally {
        // Clear notifying state after a delay
        setTimeout(() => {
          notifyingOrders.value[orderID] = false
        }, 500)
      }
    }

    const handleLogin = () => {
      loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      })
    }

    // async function connectWebSocket() {
    //   try {
    //     const token = await getAccessTokenSilently()
    //     const wsUrl = `https://jqxxikk287.execute-api.sa-east-1.amazonaws.com/prod/?token=${token}`

    //     // Cerrar el websocket existente si hay uno
    //     if (websocket.value && websocket.value.readyState !== WebSocket.CLOSED) {
    //       websocket.value.close()
    //     }

    //     websocket.value = new WebSocket(wsUrl)

    //     websocket.value.onopen = () => {
    //       console.log('WebSocket connection established')
    //       // Resetear el contador de intentos cuando se conecta exitosamente
    //       reconnectAttempts.value = 0
    //     }

    //     websocket.value.onmessage = async (event) => {
    //       try {
    //         await fetchOrders()
    //       } catch (error) {
    //         console.error('Error parsing WebSocket message:', error)
    //       }
    //     }

    //     websocket.value.onerror = (error) => {
    //       console.error('WebSocket error:', error)
    //     }

    //     websocket.value.onclose = (event) => {
    //       console.log('WebSocket connection closed', event)

    //       // Implementar reconexión con backoff exponencial
    //       if (reconnectAttempts.value < maxReconnectAttempts) {
    //         const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts.value)
    //         console.log(`Attempting to reconnect in ${delay}ms... (Attempt ${reconnectAttempts.value + 1}/${maxReconnectAttempts})`)

    //         reconnectTimeout.value = setTimeout(async () => {
    //           reconnectAttempts.value++
    //           await connectWebSocket()
    //         }, delay)
    //       } else {
    //         console.error('Max reconnection attempts reached. Please refresh the page.')
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error setting up WebSocket:', error)

    //     // También intentar reconectar si falla la configuración inicial
    //     if (reconnectAttempts.value < maxReconnectAttempts) {
    //       const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts.value)
    //       reconnectTimeout.value = setTimeout(async () => {
    //         reconnectAttempts.value++
    //         await connectWebSocket()
    //       }, delay)
    //     }
    //   }
    // }

    // Función para verificar y reconectar periódicamente si es necesario
    // const checkConnection = () => {
    //   if (isAuthenticated.value && (!websocket.value || websocket.value.readyState === WebSocket.CLOSED || websocket.value.readyState === WebSocket.CLOSING)) {
    //     console.log('WebSocket connection lost, attempting to reconnect...')
    //     connectWebSocket()
    //   }
    // }

    // Configurar un intervalo para verificar la conexión
    const connectionCheckInterval = ref(null)

    onMounted(async () => {
      // Wait for Auth0 to initialize before proceeding
      while (auth0IsLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      if (isAuthenticated.value) {
        await fetchOrders()
        startLongPolling()
        // await connectWebSocket()

        // Verificar la conexión cada 30 segundos
        // connectionCheckInterval.value = setInterval(checkConnection, 30000)
      } else {
        isLoading.value = false
      }
    })

    onBeforeUnmount(() => {
      if (longPollingTimeout.value) {
        clearTimeout(longPollingTimeout.value)
      }
    })

    // Limpiar intervalos y timeouts cuando el componente se desmonta
    // onBeforeUnmount(() => {
    //   if (connectionCheckInterval.value) {
    //     clearInterval(connectionCheckInterval.value)
    //   }

    //   if (reconnectTimeout.value) {
    //     clearTimeout(reconnectTimeout.value)
    //   }

    //   if (websocket.value) {
    //     websocket.value.close()
    //   }
    // })

    return {
      isAuthenticated,
      recentOrders,
      deliveredOrders,
      filteredRecentOrders,
      filteredDeliveredOrders,
      isLoading,
      view,
      fetchOrders,
      notify,
      notifyingOrders,
      handleLogin,
      formatRelativeTime,
      searchQuery,
      filterOrders,
    }
  },
}
</script>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
