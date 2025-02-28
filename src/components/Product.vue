<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="sticky top-0 flex bg-[#1C1C1E] pb-8 z-10 justify-between items-center">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <div class="relative" @click="goToCart">
        <img src="/cart.png" alt="Vue logo" class="h-7" />
        <template v-if="numberOfItems > 0">
          <div class="absolute top-0 right-0 bg-[#6DF338] text-[#1C1C1E] rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ numberOfItems }}
          </div>
        </template>
      </div>
    </div>

    <div class="bg-[#FBF2FF] rounded-2xl flex flex-col ">
      <div class="rounded-t-2xl overflow-hidden">
        <img :src="product.image_url" :alt="product.name" class="w-full object-cover" />
      </div>
      <div class="flex flex-col items-start p-4">
        <div class="grid grid-cols-2 items-center justify-between w-full">
          <h1 class="text-black pt-1 text-2xl font-semibold">{{ product.name }}</h1>
          <h2 class="text-black mt-1 text-2xl font-semibold text-right">$ {{ product.price }}</h2>
        </div>
        <p v-if="product.description" class="text-gray-500">{{product.description}}</p>
        <div class="w-full mt-4 mb-4">
          <div class="h-0.5 bg-gray-300"></div>
        </div>
        <div class="flex items-center justify-end w-full">
          <div @click="minusQuantity" class="rounded-full bg-[#BE38F3] h-8 w-8 flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path d="M19 13H5v-2h14v2z" fill="currentColor" />
            </svg>
          </div>
          <div class="w-10 flex font-semibold text-xl items-center justify-center text-black">
            {{ quantity }}
          </div>
          <div @click="plusQuantity" class="rounded-full bg-[#BE38F3] h-8 w-8 flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="h-4"></div>
    <h1 @click="addToCart" class=" bg-[#BE38F3] py-3 text-xl text-center rounded-xl cursor-pointer">Agregar al carrito</h1>
  </div>
  <NavBar currentView="Events" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import NavBar from './NavBar.vue'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const eventName = route.params.event
const quantity = ref(1)
const product = productStore.getSelectedProduct()
const numberOfItems = ref(0)

onMounted(() => {
  numberOfItems.value = cartStore.state.numberOfItems
})

function goBack() {
  router.back()
}

function goToCart() {
  router.push('/cart')
}

function minusQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function plusQuantity() {
  quantity.value++
}

function addToCart() {
  cartStore.addToCart(product, quantity.value)
  router.back()
}
</script>