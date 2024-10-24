<template>
  <div class="h-screen flex flex-col bg-[#1C1C1E] text-white p-8 pb-20 relative">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <img @click="goBack" src="/back.png" alt="Back" class="h-7" />
      <div class="relative" @click="goToCart">
        <img src="/cart.png" alt="Cart" class="h-7" />
        <template v-if="numberOfItems > 0">
          <div class="absolute top-0 right-0 bg-[#6DF338] text-[#1C1C1E] rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ numberOfItems }}</div>
        </template>
      </div>
    </div>
    <div class="pb-14"></div>
    
    <!-- Product Grid -->
    <div class="grid grid-cols-2 gap-4">
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

    <!-- Floating Cart Button -->
    <div v-if="numberOfItems > 0" 
         @click="goToCart"
         class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#6DF338] text-[#1C1C1E] px-6 py-3 rounded-full font-bold shadow-lg cursor-pointer hover:bg-[#5BD328] transition-colors duration-200">
      Ir al carrito ({{ numberOfItems }})
    </div>
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
    const event = ref({})
    const numberOfItems = ref(0)
    const isLoading = ref(true)
    const productStore = useProductStore()
    const cartStore = useCartStore()

    const navigateToProduct = (item) => {
      productStore.setSelectedProduct(item)
      router.push(`/menu/${event.value.name}/${item.name.toLowerCase()}`)
    }

    const goBack = () => {
      router.back()
    }

    const goToCart = () => {
      router.push('/cart')
    }

    const imageUrl = (image) => {
      return new URL(`${image}`, import.meta.url).href
    }

    onMounted(async () => {
      const auth = getAuth()
      event.value = JSON.parse(localStorage.getItem('venue')) || {
        'SK' : 'V#2a5e6d27-65a0-4984-a85d-ba1cc713de68',
        'name': 'NQ Fest'
      }
      if (!event.value) {
        const response = await fetch(`https://api.nqpay.lat/venues/`)
        const data = await response.json()
        for (const venue of data) {
          if (venue.name.toLowerCase() === route.params.event) {
            event.value = venue
            break
          }
        }
      }

      const idToken = await auth.currentUser.getIdToken()
      try {
        const response = await fetch(`https://api.nqpay.lat/venues/NQ%20Fest/products`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        const data = await response.json()
        products.value = data.products
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
      event,
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
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>