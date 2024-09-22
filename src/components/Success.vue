<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div v-if="order" class="h-full">
      <div class="h-14 w-1/2 mb-10 bg-opacity-5 bg-white rounded-lg"></div>
      <div class="flex justify-between">
        <p class="text-2xl font-bold">Tu Pedido</p>
        <div class="bg-opacity-25 rounded-lg px-2 py-1 items-center flex" :class="order.status == 'PAID' ? 'bg-green-500' : 'bg-red-500'">
          <p v-if="order.status == 'PAID'">Pagado</p>
          <p v-else>Entregado</p>
        </div>
      </div>
      <p class="mt-2" v-if="order.status == 'PAID'">Acercate a la barra a retirar tu pedido</p>
      <p class="mt-2" v-else>Este pedido ya ha sido entregado</p>
      <div class="justify-center pb-40 flex h-full flex-col">
        <div class="flex w-full flex-col">
          <div class="self-center">
            <p class="text-2xl font-medium pb-5">Código QR para retiro</p>
            <div class="rounded-2xl p-2 bg-[#D2D2D2]">
              <QRCodeVue3
                v-if="order.id"
                :value="order.id"
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
            <div v-for="item in order.items">
              <p class="font-bold">x{{ item.quantity }} {{ item.name }}</p>
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
      const response = await fetch(`https://api.nqpay.lat/checkout/${order_id}`)
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
