<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <a class="text-xl font-semibold">Carrito</a>
      <div class="h-7 w-7"></div>
      <!-- Empty space for alignment -->
    </div>

    <div class="h-14"></div>
    <h1 class="text-3xl font-semibold">Tu Pedido</h1>
    <div class="h-14"></div>
    <div v-if="cartItems.length > 0" class="flex flex-col gap-4 h-4/5 overflow-auto">
      <div v-for="item in cartItems" :key="item.product.name" class="w-full flex flex-col flex-none">
        <div class="flex items-center gap-4 bg-[#FBF2FF] border rounded-2xl p-2">
          <img :src="item.product.image" :alt="item.product.name" class="h-24 w-24 rounded-xl object-cover" />
          <div class="flex flex-grow flex-col justify-between">
            <div>
              <h1 class="text-black text-xl font-semibold">{{ item.product.name }}</h1>
              <p class="text-black text-xs">Bebida Alcoholica...</p>
              <h2 class="text-black text-lg font-semibold">{{ item.product.price }}</h2>
            </div>
          </div>
          <div class="flex items-center">
            <div v-if="item.quantity > 1" @click="decreaseQuantity(item.product)" class="rounded-full bg-[#BE38F3] h-8 w-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path d="M19 13H5v-2h14v2z" fill="currentColor" />
              </svg>
            </div>
            <div v-else @click="removeFromCart(item.product)" class="rounded-full bg-[#BE38F3] h-8 w-8 flex items-center justify-center">
              <img src="/bin.png" alt="Vue logo" class="h-4" />
            </div>
            <div class="w-10 h-10 flex font-semibold text-xl items-center justify-center text-black">
              {{ item.quantity }}
            </div>
            <div @click="increaseQuantity(item.product)" class="rounded-full bg-[#BE38F3] h-8 w-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        <div class="h-2"></div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <p class="text-xl">Tu carrito está vacío.</p>
    </div>
    <div v-if="cartTotal > 0" class="mt-2 w-full bg-[#BE38F3] py-3 text-xl text-center rounded-xl">Total: {{ new Intl.NumberFormat('en-US').format(cartTotal) }}</div>
  </div>
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
