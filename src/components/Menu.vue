<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <!-- {{ event }} -->
      <a class="text-xl font-semibold">{{ event.name }}</a>
      <div class="relative" @click="goToCart">
        <img @click="goToCart()" src="/cart.png" alt="Vue logo" class="h-7" />
        <template v-if="this.numberOfItems > 0">
          <div class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ this.numberOfItems }}</div>
        </template>
      </div>
    </div>
    <div class="h-14"></div>
    <!-- <div class="w-full h-10 bg-[#452353] rounded-xl flex justify-between px-8 items-center">
      <a>Tragos</a>
      <a class="text-[#4F4356]">|</a>
      <a>Cervezas</a>
      <a class="text-[#4F4356]">|</a>
      <a>Vinos</a>
      <a class="text-[#4F4356]">|</a>
      <a>Otros</a>
    </div> -->
    <div class="h-10"></div>

    <!-- <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 gap-8">
      <div v-for="item in favoritos" :key="item.name" @click="navigateToProduct(item)" class="h-full w-1/2 bg-white rounded-2xl flex flex-col flex-none md:w-1/3 md:pb-4 border">
        <div class="w-full h-4/6 rounded-t-2xl overflow-hidden">
          <img :src="imageUrl(item.image)" alt="img" />
        </div>
        <div class="flex items-center justify-between">
          <h1 class="text-black pt-1 px-2 text-lg font-bold">{{ item.name }}</h1>
          <h2 class="text-black px-2 mt-1 mr-2 text-sm font-semibold border border-1 border-violet-800 rounded-full">{{ item.price }}</h2>
        </div>
      </div>
    </div> -->

    <div class="grid grid-cols-2 gap-2">
      <div v-for="item in products" :key="item.id" @click="navigateToProduct(item)" class="h-full bg-white rounded-2xl flex flex-col flex-none md:w-1/3 md:pb-4 border">
        <div class="w-full h-3/4 rounded-t-2xl overflow-hidden">
          <img :src="imageUrl(`/${item.image}`)" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex items-center justify-between">
          <h1 class="text-black pt-1 px-2 text-lg font-bold">{{ item.name }}</h1>
          <h2 class="text-black px-2 mt-1 mr-2 text-sm font-semibold border border-1 border-violet-800 rounded-full">$ {{ item.price }}</h2>
        </div>
      </div>
    </div>
    <!-- <a class="text-2xl font-semibold">Promos</a>
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
    </div> -->
  </div>

  <NavBar currentView="Events" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { onMounted, ref } from 'vue'
import NavBar from './NavBar.vue'

export default {
  name: 'Menu',
  components: {
    NavBar,
  },
  data() {
    return {
      route: useRoute(),
      router: useRouter(),
      products: [],
      promos: [],
      event: {},
      numberOfItems: ref(0),
      productStore: useProductStore(),
      cartStore: useCartStore(),
    }
  },
  methods: {
    navigateToProduct(item) {
      this.productStore.setSelectedProduct(item)
      this.router.push(`/menu/${this.event.name}/${item.name.toLowerCase()}`)
    },
    goBack() {
      this.router.back()
    },
    goToCart() {
      this.router.push('/cart')
    },
    imageUrl(image) {
      return new URL(`${image}`, import.meta.url).href
    },
  },
  async mounted() {
    this.event = JSON.parse(localStorage.getItem('venue')) || {
      'SK' : 'V#2a5e6d27-65a0-4984-a85d-ba1cc713de68',
      'name': 'NQ Fest'
    }
    if (!this.event) {
      const response = await fetch(`https://api.nqpay.lat/venues/`)
      const data = await response.json()
      console.log('dataaa: ', data)
      for (const venue of data) {
        console.log('vanue.name: ', venue.name)
        console.log('event: ', this.route.params.event)
        if (venue.name.toLowerCase() === this.route.params.event) {
          this.event = venue
          break
        }
      }
    }
    const response = await fetch(`https://api.nqpay.lat/venues/${this.event.SK.slice(2)}/products`)
    const data = await response.json()
    this.products = data
    this.numberOfItems = this.cartStore.state.numberOfItems
  },
}
</script>
