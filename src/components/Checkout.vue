<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <div></div>
    </div>
    <div class="h-14"></div>
    <h1 class="text-3xl font-semibold">Historial de Pedidos</h1>
    <p>Acá vas a encontrar todas las compras que hiciste y tus códigos QR para retirar tus tragos.</p>
    <div class="h-14"></div>
    <div class="flex flex-col gap-4">
      <div v-on:click="navigateToOrder(order)" v-for="order in orders" :key="order.id" class="flex items-center gap-4 bg-white bg-opacity-15 text-white rounded-lg p-2">
        <img :src="order.venue_name + '.png'" alt="venue" class="h-12 w-12 rounded-lg object-cover" />
        <div class="flex flex-col w-full">
          <p class="font-bold">Total de la orden</p>
          <p class="">${{ order.total }}</p>
        </div>
        <div class="flex flex-col justify-start h-full">
          <p class="text-[#D4CAD8]">04/07/2024</p>
          <div class="bg-opacity-25 justify-center rounded-lg px-2 py-1 items-center flex" :class="order.order_status == 'PAID' ? 'bg-green-500' : 'bg-red-500'">
            <p v-if="order.order_status == 'PAID'">Pagado</p>
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
      console.log("orderrsss: ", orders.value)
    } else {
      console.error('Error al obtener el pedido:', response.statusText)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error.message)
  }
})
</script>

<style scoped>
/* Adding some styles to ensure the layout behaves correctly */
</style>
