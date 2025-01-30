<template>
  <div class="min-h-screen flex flex-col bg-[#1C1C1E] text-white relative">
    <!-- Header (fixed at top) -->
    <div class="sticky top-0 bg-[#1C1C1E] p-8 z-10">
      <div class="flex justify-between items-center">
        <div class="w-7"></div>
        <!-- <img @click="goBack" src="/back.png" alt="Back" class="h-7" /> -->
        <a class="text-xl font-semibold">Menú</a>
        <div class="relative" @click="goToCart">
          <img src="/cart.png" alt="Cart" class="h-7 w-8" />
          <template v-if="numberOfItems > 0">
            <div class="absolute top-0 right-0 bg-[#6DF338] text-[#1C1C1E] rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ numberOfItems }}</div>
          </template>
        </div>
      </div>
    </div>

    <!-- Contenido principal scrolleable -->
    <div class="flex-1 p-8 pt-0">
      <!-- Product Grid -->
      <div class="grid grid-cols-2 gap-4" :class="numberOfItems > 0 ? 'pb-28' : 'pb-20'">
        <template v-if="isLoading">
          <div v-for="i in 6" :key="i" class="bg-gray-800 rounded-2xl animate-pulse">
            <div class="w-full pb-[100%] rounded-t-2xl bg-gray-700"></div>
            <div class="p-2">
              <div class="w-3/4 h-4 bg-gray-700 rounded"></div>
              <div class="w-1/4 h-4 bg-gray-700 rounded mt-2"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="item in products" :key="item.id" @click="navigateToProduct(item)" class="bg-white rounded-2xl flex flex-col overflow-hidden">
            <div class="w-full pb-[100%] relative">
              <img :src="imageUrl(item.image_url)" :alt="item.name" class="absolute top-0 left-0 w-full h-full object-cover" />
            </div>
            <div class="p-2">
              <h1 class="text-black text-sm font-bold truncate">{{ item.name }}</h1>
              <h2 class="text-black text-sm font-semibold mt-1">${{ item.price }}</h2>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Botón de carrito (fixed at bottom) -->
    <div v-if="numberOfItems > 0" @click="goToCart" class="fixed bottom-10 left-8 right-8 mb-10 bg-[#BE38F3] py-3 text-xl text-center rounded-xl">Ir al carrito</div>
  </div>

  <NavBar currentView="Events" />
</template>

<script>
import { getAuth } from 'firebase/auth'
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
  setup() {
    const route = useRoute()
    const router = useRouter()
    const products = ref([])
    const venueName = ref('')
    const numberOfItems = ref(0)
    const isLoading = ref(true)
    const productStore = useProductStore()
    const cartStore = useCartStore()

    const navigateToProduct = (item) => {
      productStore.setSelectedProduct(item)
      router.push(`/menu/${venueName.value}/${item.name.toLowerCase()}`)
    }

    const goBack = () => {
      router.push('/')
    }

    const goToCart = () => {
      router.push('/cart')
    }

    const imageUrl = (image) => {
      return new URL(`${image}`, import.meta.url).href
    }

    onMounted(async () => {
      const auth = getAuth()
      try {
        venueName.value = window.location.hostname.split('.')[0]
        const cachedProducts = localStorage.getItem('products')
        const lastFetchTime = localStorage.getItem('lastProductsFetchTime')
        const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

        // Usar caché si existe y no han pasado 5 minutos
        if (cachedProducts && lastFetchTime && Date.now() - parseInt(lastFetchTime) < CACHE_DURATION) {
          products.value = JSON.parse(cachedProducts)
        } else {
          // Si no hay caché o pasaron 5 minutos, hacer el request
          const idToken = await auth.currentUser.getIdToken()
          const response = await fetch(`https://api.nqpay.lat/venues/${venueName}/products`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          })
          const data = await response.json()
          products.value = data.products

          // Guardar en caché con timestamp
          localStorage.setItem('products', JSON.stringify(data.products))
          localStorage.setItem('lastProductsFetchTime', Date.now().toString())
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        isLoading.value = false
      }

      numberOfItems.value = cartStore.state.numberOfItems
    })

    return {
      route,
      router,
      products,
      venueName,
      numberOfItems,
      isLoading,
      productStore,
      cartStore,
      navigateToProduct,
      goBack,
      goToCart,
      imageUrl,
    }
  },
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
