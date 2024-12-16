<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white px-4 lg:px-8 ">
    <div class="bg-[#1C1C1E] h-screen flex flex-col">
      <div class="flex justify-between items-center py-4 lg:py-8 text-white">
        <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
        <a class="text-xl font-semibold">Historial de Escaneos</a>
        <div class="h-7 w-7"></div>
      </div>
      
      <p class="text-white font-regular pb-10">
        Acá vas a encontrar todas las ordenes que escanearon.
      </p>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex flex-col gap-4">
        <div v-for="n in 3" :key="n" class="flex items-center justify-between gap-4 bg-white bg-opacity-15 rounded-lg p-2 px-2">
          <div class="flex flex-col gap-2 flex-1">
            <div class="h-5 w-32 bg-white bg-opacity-10 rounded animate-pulse"></div>
            <div class="h-5 w-20 bg-white bg-opacity-10 rounded animate-pulse"></div>
          </div>
          <div class="flex flex-col h-full justify-center">
            <div class="h-8 w-24 bg-white bg-opacity-10 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- No orders state -->
      <p v-else-if="!orders.length" class="text-center text-gray-400">
        No hay ordenes creadas.
      </p>

      <!-- Orders list -->
      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="order in orders" 
          :key="order.id"
          @click="navigateToOrder(order)"
          class="flex items-center justify-between gap-4 bg-white bg-opacity-15 text-white rounded-lg p-2 px-2 text-xs lg:text-lg"
        >
          <div class="flex flex-col">
              <div class="flex items-center gap-2 lg:gap-4">
                <p class="font-bold min-w-max">{{ order.ticket_code.substring(0,3) }}-{{ order.ticket_code.substring(3,6) }}</p>
                <p class="min-w-max font-thin lg:text-sm">{{order.created_at.split('T')[0]}} {{order.created_at.split('T')[1].split(':')[0]}}:{{ order.created_at.split('T')[1].split(':')[1]}}</p>
              </div>
              <div class="flex items-center gap-2">
                <p class="">{{ order.delivered_by }}</p>
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from './NavBar.vue'

export default {
  name: 'Order',
  components: { NavBar },
  setup() {
    const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0()
    const route = useRoute()
    const router = useRouter()
    const orders = ref([])
    const isLoading = ref(true)

    function goBack() {
      router.replace('/admin')
    }

    const fetchOrders = async () => {
      try {
        if (!isAuthenticated.value) {
          await loginWithRedirect()
          return
        }

        const token = await getAccessTokenSilently()
        const response = await fetch(`https://api.nqpay.lat/orders-delivered`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        if (response.ok) {
          const data = await response.json()
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

    const navigateToOrder = (order) => {
      // Implement navigation logic to order details
      console.log('Navigate to order', order)
    }

    onMounted(fetchOrders)

    return {
      isAuthenticated,
      orders,
      isLoading,
      navigateToOrder,
      goBack,
    }
  }
}
</script>