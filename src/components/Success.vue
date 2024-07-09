<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div v-if="order">
      <p>Tu Pedido</p>
      <p v-if="order.status == 'PAID'">Acercate a la barra a retirar tu pedido</p>
      <p v-else>Este pedido ya ha sido entregado</p>
      <QRCodeVue3
        v-if="order.id"
        :width="200"
        :height="200"
        :value="order.id"
        :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
        :dotsOptions="{ type: 'square', color: '#000' }"
        :backgroundOptions="{ color: '#ffffff' }"
        :cornersSquareOptions="{ type: 'square', color: '#000000' }"
        :cornersDotOptions="{ type: undefined, color: '#000000' }"
        fileExt="png"
        myclass="my-qr"
        imgclass="img-qr"
      />
      <p>Total: $ {{ order.total }}</p>
      <div v-for="item in order.items">
        <p>x{{ item.quantity }} {{ item.name }}</p>
      </div>
    </div>
    <div v-else>Cargando datos...</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'

const order = ref(null)
const router = useRoute()

onMounted(async () => {
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
