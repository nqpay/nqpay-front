<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <div></div>
    </div>
    <div class="h-14"></div>
    <h1 class="text-3xl font-semibold">Historial de Pedidos</h1>
    <p>Acá vas a encontrar todas las compras que hiciste y tus códigos QR para retirar tus tragos.</p>
    <div class="h-14"></div>

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
    <p v-else-if="orders.length === 0" class="text-center text-gray-400">
      No hay ordenes creadas.
    </p>

    <!-- Orders list -->
    <div v-else class="flex flex-col gap-4">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        @click="navigateToOrder(order)"
        class="flex items-center justify-between gap-4 bg-white bg-opacity-15 text-white rounded-lg p-2 px-2"
      >
        <div class="flex flex-col">
          <p class="font-bold">Total de la orden</p>
          <p class="">${{ order.total }}</p>
        </div>
        <div class="flex flex-col h-full justify-center">
          <div 
            class="justify-center rounded-lg px-2 py-1 items-center flex" 
            :class="order.status == 'PAID' ? 'bg-[#8419C5]' : 'bg-green-500'"
          >
            <p v-if="order.status == 'PAID'">Ir a Retirar</p>
            <p v-else>Entregado</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NavBar currentView="Checkout" />
</template>

<script setup>
import { getAuth } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'

const orders = ref([])
const isLoading = ref(true)
const router = useRouter()

const navigateToOrder = (order) => {
  router.push({
    path: `/success`,
    query: {
      external_reference: order.id,
    },
  })
}

onMounted(async () => {
  try {
    const auth = getAuth()
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(`https://api.nqpay.lat/orders`, {
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
})
</script>