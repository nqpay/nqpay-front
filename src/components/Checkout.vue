<template>
  <div class="fixed inset-0 flex flex-col bg-[#1C1C1E] text-white px-8 overflow-hidden">
    <div class="bg-[#1C1C1E] h-screen flex flex-col">
      <div class="flex justify-between items-center py-8 text-white">
        <div class="w-7"></div>
        <!-- <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" /> -->
        <a class="text-xl font-semibold">Historial de Pedidos</a>
        <div class="h-7 w-7"></div>
      </div>
      <p class="text-white font-regular pb-10">Acá vas a encontrar todas las compras que hiciste y tus códigos QR para retirar tus tragos.</p>

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

      <!-- No orders message -->
      <p v-else-if="orders.length === 0" class="text-center text-gray-400">No hay ordenes creadas.</p>

      <!-- Orders list -->
      <div v-else class="flex flex-col gap-4 overflow-auto mb-40">
        <div
          v-for="order in orders"
          :key="order.id"
          @click="navigateToOrder(order)"
          class="flex items-center justify-between gap-4 bg-white bg-opacity-15 text-white rounded-lg p-2 px-2"
        >
          <div class="flex flex-col">
            <div class="flex items-center gap-4">
              <p class="font-bold">{{ order.ticket_code.substring(0, 3) }}-{{ order.ticket_code.substring(3, 6) }}</p>
              <p class="font-thin text-sm">
                {{ order.created_at.split('T')[0] }} {{ order.created_at.split('T')[1].split(':')[0] }}:{{ order.created_at.split('T')[1].split(':')[1] }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <p class="">
                ${{
                  order.total
                    .toString()
                    .split('.')[0]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }}
              </p>
              <p v-if="order.tip > 0" class="text-gray-400 text-sm">+${{ order.tip }} ♥</p>
            </div>
          </div>
          <div class="flex flex-col h-full justify-center">
            <div
              class="justify-center rounded-lg px-2 py-1 items-center flex"
              :class="{
                'bg-[#8419C5]': order.status === 'PAID',
                'bg-blue-500': order.status === 'NOTIFIED',
                'bg-green-500': order.status === 'DELIVERED',
              }"
            >
              <p class="text-sm" v-if="order.status == 'PAID'">En Preparación</p>
              <p v-else-if="order.status == 'NOTIFIED'">Ir a Retirar</p>
              <p v-else-if="order.status == 'DELIVERED'">Entregado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavBar currentView="Checkout" />
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'

const orders = ref([])
const isLoading = ref(true)
const router = useRouter()
const auth = getAuth()

const navigateToOrder = (order) => {
  router.push({
    path: `/success`,
    query: {
      external_reference: order.id,
    },
  })
}

async function fetchOrders() {
  try {
    if (!auth.currentUser) {
      console.log('No user is signed in')
      isLoading.value = false
      return
    }

    const idToken = await auth.currentUser.getIdToken(true) // Force token refresh

    let venueName = window.location.hostname.split('.')[0]
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('ngrok-free.app')) {
      venueName = 'nq'
    }

    const response = await fetch(`https://api.nqpay.lat/venues/${venueName}/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      orders.value = data.orders
    } else {
      console.error('Error al obtener el pedido:', response.statusText)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  isLoading.value = true

  // Use onAuthStateChanged to wait for auth state to be fully initialized
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchOrders()
    } else {
      console.log('Usuario no autenticado')
      isLoading.value = false
      router.push('/')
      // Optionally redirect to login page
    }
  })

  // Clean up the subscription when component is unmounted
  return () => unsubscribe()
})
</script>
