<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <a class="text-xl font-semibold">{{ eventName.charAt(0).toUpperCase() + eventName.slice(1) }}</a>
      <div class="relative" @click="goToCart">
        <img @click="goToCart()" src="/cart.png" alt="Vue logo" class="h-7" />
        <template v-if="numberOfItems > 0">
          <div class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ numberOfItems }}</div>
        </template>
      </div>
    </div>
    <div class="h-14"></div>
    <div class="w-full h-10 bg-[#452353] rounded-xl flex justify-between px-8 items-center">
      <a>Tragos</a>
      <a class="text-[#4F4356]">|</a>
      <a>Cervezas</a>
      <a class="text-[#4F4356]">|</a>
      <a>Vinos</a>
      <a class="text-[#4F4356]">|</a>
      <a>Otros</a>
    </div>
    <div class="h-14"></div>
    <a class="text-2xl font-semibold">Favoritos</a>
    <div class="h-5"></div>

    <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 gap-8">
      <div v-for="item in favoritos" :key="item.name" @click="navigateToProduct(item)" class="h-full w-1/2 bg-white rounded-2xl flex flex-col flex-none md:w-1/3 md:pb-4 border">
        <div class="w-full h-4/6 rounded-t-2xl overflow-hidden">
          <!-- <v-img :src="item.image" :alt="item.name" class="w-full"> </v-img> -->
          <img :src="imageUrl(item.image)" alt="img" />
        </div>
        <div class="flex items-center justify-between">
          <h1 class="text-black pt-1 px-2 text-lg font-bold">{{ item.name }}</h1>
          <h2 class="text-black px-2 mt-1 mr-2 text-sm font-semibold border border-1 border-violet-800 rounded-full">{{ item.price }}</h2>
        </div>
      </div>
    </div>
    <a class="text-2xl font-semibold">Promos</a>
    <div class="h-5"></div>

    <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 gap-8">
      <div v-for="item in promos" :key="item.name" @click="navigateToProduct(item)" class="h-full w-1/2 bg-white rounded-2xl flex flex-col flex-none md:w-1/3 md:pb-4 border">
        <div class="w-full h-3/4 rounded-t-2xl overflow-hidden">
          <img :src="imageUrl(item.image)" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex items-center justify-between">
          <h1 class="text-black pt-1 px-2 text-lg font-bold">{{ item.name }}</h1>
          <h2 class="text-black px-2 mt-1 mr-2 text-sm font-semibold border border-1 border-violet-800 rounded-full">{{ item.price }}</h2>
        </div>
      </div>
    </div>
  </div>

  <NavBar currentView="Events" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { ref } from 'vue'
import NavBar from './NavBar.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
console.log('cartStoreeee: ', cartStore.state.numberOfItems)

const eventName = route.params.event
const numberOfItems = ref(cartStore.state.numberOfItems)

const favoritos = [
  { name: 'Fernet', image: '/fernet.png', price: '$3.000' },
  { name: 'Vino Tinto', image: '/vino.png', price: '$3.000' },
  { name: 'Vodka', image: '/vodka.png', price: '$3.000' },
]

const promos = [
  { name: 'Cerveza', image: '/cerveza.png', price: '3 x 2' },
  { name: 'Whiscola', image: '/whiscola.png', price: '$3.000' },
  { name: 'Tequila Sun', image: '/tequila.png', price: '$3.000' },
]

function navigateToProduct(item) {
  productStore.setSelectedProduct(item)
  console.log('seteando producto: ', productStore.getSelectedProduct())
  router.push(`/menu/${eventName}/${item.name.toLowerCase()}`)
}

function goBack() {
  router.back()
}

function goToCart() {
  router.push('/cart')
}

function imageUrl(image) {
  return new URL(`${image}`, import.meta.url).href
}
</script>
