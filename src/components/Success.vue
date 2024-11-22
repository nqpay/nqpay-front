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
        <div class="rounded-lg px-2 py-1 items-center flex" :class="order.order_status == 'PAID' ? 'bg-[#8419C5]' : 'bg-green-500'">
          <p v-if="order.order_status == 'PAID'">Ir a Retirar</p>
          <p v-else>Entregado</p>
        </div>
      </div>
      <div class="pt-1"></div>
      <p class="mt-2" v-if="order.order_status == 'PAID'">Acercate a la barra a retirar tu pedido</p>
      <p class="mt-2" v-else>Este pedido ya ha sido entregado</p>
      <div class="justify-center pb-40 flex h-full flex-col">
        <div class="flex w-full flex-col">
          <div class="self-center">
            <p class="text-2xl font-medium pb-5">Código QR para retiro</p>
            <div class="rounded-2xl p-2 bg-[#D2D2D2]">
              <QRCodeVue3
                v-if="route.query.external_reference"
                :value="route.query.external_reference"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'L' }"
                :dotsOptions="{ type: 'square', color: '#000' }"
                :backgroundOptions="{ color: '#D2D2D2' }"
                :cornersSquareOptions="{ type: 'square', color: '#000000' }"
                :cornersDotOptions="{ type: undefined, color: '#000000' }"
                fileExt="png"
                imgclass="img-qr"
              />
            </div>
            <p v-if="order.ticket_code" class="text-center font-bold text-xl pt-3">{{ order.ticket_code.substring(0,3) }}-{{ order.ticket_code.substring(3,6) }}</p>
            <p class="pt-5">$ {{ order.total.toString().split(".")[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</p>
            <div v-for="item in order.products">
              <p class="font-bold">{{ item.quantity }}x {{ item.name }}</p>
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
import { onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import QRCodeVue3 from 'qrcode-vue3'
import NavBar from './NavBar.vue'

const isLoading = ref(true)
const order = ref(null)
const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

onMounted(async () => {
  if (route.query.preference_id != null & route.query.payment_id != null) {
    cartStore.clearCart()
  }
  const order_id = route.query.external_reference
  if (order_id) {
    try {
      const auth = getAuth()
      const idToken = await auth.currentUser.getIdToken()
      const response = await fetch(`https://api.nqpay.lat/orders/${order_id}/products`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        console.log('ORDERRRR : ', data)
        order.value = data
        isLoading.value = false
      } else {
        console.error('Error al obtener el pedido:', response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message)
    }
  }
})

function goBack() {
  router.push('/checkout')
}
</script>