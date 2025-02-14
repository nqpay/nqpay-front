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
        <div v-else-if="recentOrders.length === 0" class="text-center py-8">
          <p class="text-gray-400">No hay órdenes recientes</p>
        </div>
        <div v-else v-for="order in recentOrders" :key="order.id" class="mb-2">
          <div class="bg-[#F7F3FA] text-black p-4 rounded-xl shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="font-semibold">Orden #{{ order.ticket_code }}</h2>
                <p class="text-gray-600 text-sm">{{ order.created_at }}</p>
              </div>
              <button v-if="order.status == 'PAID'" v-on:click="notify(order.id)" class="bg-[#1E1E1E] text-white px-5 py-2 text-xs rounded-full">Notificar</button>
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
        <div v-if="deliveredOrders.length === 0" class="text-center py-8">
          <p class="text-gray-400">No hay órdenes entregadas</p>
        </div>
        <div v-else v-for="order in deliveredOrders" :key="order.id" class="mb-2">
          <div class="bg-[#F7F3FA] text-black p-4 rounded-xl shadow-lg">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="font-semibold">Orden #{{ order.ticket_code }}</h2>
                <p class="text-gray-600 text-sm">{{ order.created_at }}</p>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <div v-for="item in order.products" :key="item.name" class="flex items-center gap-2">
                <img :src="item.image_url" alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p class="font-medium">{{ item.name }}</p>
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
import { ref, onMounted } from 'vue'

export default {
  components: { AdminNavBar },
  setup() {
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading: auth0IsLoading } = useAuth0()
    const recentOrders = ref([])
    const deliveredOrders = ref([])
    const view = ref('recent')
    const isLoading = ref(true)

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
        } else {
          console.error('Failed to fetch orders')
          recentOrders.value = []
          deliveredOrders.value = []
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        recentOrders.value = []
        deliveredOrders.value = []
      } finally {
        isLoading.value = false
      }
    }

    const notify = async (orderID) => {
      try {
        if (!isAuthenticated.value) return

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
            recentOrders.value[orderIndex] = {
              ...recentOrders.value[orderIndex],
              status: 'NOTIFIED',
            }
          }
        } else {
          console.error('Failed to send notification')
        }
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    }

    const handleLogin = () => {
      loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      })
    }

    onMounted(async () => {
      // Wait for Auth0 to initialize before proceeding
      while (auth0IsLoading.value) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      if (isAuthenticated.value) {
        await fetchOrders()
      } else {
        isLoading.value = false
      }
    })

    return {
      isAuthenticated,
      recentOrders,
      deliveredOrders,
      isLoading,
      view,
      fetchOrders,
      notify,
      handleLogin,
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
