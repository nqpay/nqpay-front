<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <div></div>
      <!-- <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" /> -->
      <img src="/cart.png" alt="Vue logo" class="h-7" @click="goToCart" />
    </div>
    <div class="h-14"></div>
    <h1 class="text-3xl font-semibold">Historial de Pedidos</h1>
    <p>Acá vas a encontrar todas las compras que hiciste y tus códigos QR para retirar tus tragos.</p>
    <div class="h-14"></div>
    <div class="flex flex-col gap-4">

      <div class="flex items-center gap-4 bg-[#998D9D] text-white rounded-lg p-2">
        <img src="/jet.png" alt="Vue logo" class="h-12 w-12 rounded-lg object-cover" />
        <div class="flex flex-col w-full">
          <p class="font-bold">Orden #25J4SDV8</p>
          <p class="">x2 Gin Tonic con limón</p>
        </div>
        <div class="flex flex-col justify-start h-full ">
          <p class="text-[#D4CAD8]">04/07/2024</p>
        </div>
      </div>
      <div class="flex items-center gap-4 bg-[#998D9D] text-white rounded-lg p-2">
        <img src="/jet.png" alt="Vue logo" class="h-12 w-12 rounded-lg object-cover" />
        <div class="flex flex-col w-full">
          <p class="font-bold">Orden #25J4SDV8</p>
          <p class="">x2 Gin Tonic con limón</p>
        </div>
        <div class="flex flex-col justify-start h-full ">
          <p class="text-[#D4CAD8]">04/07/2024</p>
        </div>
      </div>
      <div class="flex items-center gap-4 bg-[#998D9D] text-white rounded-lg p-2">
        <img src="/jet.png" alt="Vue logo" class="h-12 w-12 rounded-lg object-cover" />
        <div class="flex flex-col w-full">
          <p class="font-bold">Orden #25J4SDV8</p>
          <p class="">x2 Gin Tonic con limón</p>
        </div>
        <div class="flex flex-col justify-start h-full ">
          <p class="text-[#D4CAD8]">04/07/2024</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else class="flex flex-col items-center justify-center h-full"> -->
  <!-- <p class="text-xl">Tu carrito está vacío.</p> -->
  <!-- </div> -->
  <!-- <div v-if="cartTotal > 0" class="mt-2 w-full bg-[#BE38F3] py-3 text-xl text-center rounded-xl">Total: {{ new Intl.NumberFormat('en-US').format(cartTotal) }}</div> -->
  <!-- </div> -->
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { computed } from 'vue'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.cartItems)
const cartTotal = computed(() => cartStore.cartTotal)

function goBack() {
  router.back()
}

function increaseQuantity(product) {
  cartStore.increaseQuantity(product)
}

function decreaseQuantity(product) {
  cartStore.decreaseQuantity(product)
}

function removeFromCart(product) {
  cartStore.removeFromCart(product)
}
</script>

<style scoped>
/* Adding some styles to ensure the layout behaves correctly */
</style>
