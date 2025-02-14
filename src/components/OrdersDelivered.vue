<template>
  <div class="bg-[#1E1E1E] min-h-screen p-4 text-white gap-1 flex flex-col pt-10">
    <div class="flex justify-between">
      <h1 class="text-2xl">Ordenes</h1>
      <button v-on:click="fetchOrders">
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
      <button
        v-on:click="this.view = 'recent'"
        :class="this.view == 'recent' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'"
        class="px-4 py-2 rounded-full"
      >
        📜 Recientes
      </button>
      <button
        v-on:click="this.view = 'delivered'"
        :class="this.view == 'delivered' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'"
        class="border border-white px-4 py-2 rounded-full"
      >
        📑 Entregadas
      </button>
    </div>

    <div class="mt-4 space-y-4 pb-20">
      <!-- <OrderCard v-for="order in orders" :key="order.id" :order="order" /> -->
      <div v-if="this.view == 'recent'" v-for="order in this.recentOrders">
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
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-gray-600 text-xs">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.view == 'delivered'" v-for="order in this.deliveredOrders">
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

    <!-- Barra de navegación -->
    <AdminNavBar />
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import AdminNavBar from './AdminNavBar.vue'
import { ref, onMounted, computed } from 'vue'

export default {
  components: { AdminNavBar },
  setup() {
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0()
    const recentOrders = ref([])
    const deliveredOrders = ref([])
    const orders = ref([])
    const isLoading = ref(true)
    const view = ref('recent')

    const fetchOrders = async () => {
      try {
        if (!isAuthenticated.value) {
          await loginWithRedirect()
          return
        }
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

        recentOrders.value = []
        deliveredOrders.value = []

        if (response.ok) {
          const data = await response.json()
          for (let order of data.orders) {
            if (order.status != 'DELIVERED') {
              recentOrders.value.push(order)
            } else {
              deliveredOrders.value.push(order)
            }
          }
          orders.value = data.orders || []
        } else {
          console.error('Failed to fetch orders')
          orders.value = []
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        orders.value = []
      } finally {
        isLoading.value = false
      }
    }

    const notify = async (orderID) => {
      try {
        if (!isAuthenticated.value) {
          await loginWithRedirect()
          return
        }

        let venueName = window.location.hostname.split('.')[0]
        if (window.location.hostname === 'localhost') {
          venueName = 'nq'
        }

        const token = await getAccessTokenSilently()
        const response = await fetch(`https://api.nqpay.lat/orders/notifications`, {
          method: 'POST',
          headers: {
            // 'Authorization': `Bearer ${token}`,
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
          // Actualizar el estado de la orden en recentOrders
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

    onMounted(fetchOrders)

    return {
      isAuthenticated,
      orders,
      recentOrders,
      deliveredOrders,
      isLoading,
      view,
      fetchOrders,
      notify,
    }
  },
}
</script>

<style scoped></style>
