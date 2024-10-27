<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div v-if="order" class="h-full">
      <!-- <div class="h-14 w-1/2 mb-10 bg-opacity-5 bg-white rounded-lg"></div> -->
       <div class="h-10"></div>
      <div class="flex justify-between">
        <p class="text-2xl font-bold">Tu Pedido</p>
        <div class="bg-opacity-25 rounded-lg px-2 py-1 items-center flex" :class="order.order_status == 'PAID' ? 'bg-[#8419C5]' : 'bg-green-500'">
          <p v-if="order.order_status == 'PAID'">Pagado</p>
          <p v-else>Entregado</p>
        </div>
      </div>
      <p class="mt-2" v-if="order.order_status == 'PAID'">Acercate a la barra a retirar tu pedido</p>
      <p class="mt-2" v-else>Este pedido ya ha sido entregado</p>
      <div class="justify-center pb-40 flex h-full flex-col">
        <div class="flex w-full flex-col">
          <div class="self-center">
            <p class="text-2xl font-medium pb-5">Código QR para retiro</p>
            <div class="rounded-2xl p-2 bg-[#D2D2D2]">

              <QRCodeVue3
                v-if="router.query.external_reference"
                :value="router.query.external_reference"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'L' }"
                :dotsOptions="{ type: 'square', color: '#000' }"
                :backgroundOptions="{ color: '#D2D2D2' }"
                :cornersSquareOptions="{ type: 'square', color: '#000000' }"
                :cornersDotOptions="{ type: undefined, color: '#000000' }"
                fileExt="png"
                imgclass="img-qr"
              />
            </div>
            <p class="pt-5">$ {{ order.total }}</p>
            <div v-for="item in order.products">
              <p class="font-bold">{{ item.quantity }}x {{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Cargando datos...</div>
  </div>
  <NavBar currentView="Checkout" />
</template>

<script setup>
import { getAuth } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import QRCodeVue3 from 'qrcode-vue3'
import NavBar from './NavBar.vue'
const order = ref(null)
const router = useRoute()
const cartStore = useCartStore()
onMounted(async () => {
  cartStore.clearCart()
  const order_id = router.query.external_reference
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
        order.value = data
      } else {
        console.error('Error al obtener el pedido:', response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message)
    }
  }
})
</script>
