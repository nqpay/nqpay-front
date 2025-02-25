<template>
  <div class="fixed inset-0 flex flex-col bg-[#1C1C1E] text-white px-8 overflow-hidden">
    <!-- Header section -->
    <div class="flex justify-between items-center py-8">
      <img @click="goBack" src="/back.png" alt="Vue logo" class="h-7" />
      <a class="text-xl font-semibold">Mi carrito</a>
      <div class="h-7 w-8"></div>
    </div>
    <p class="">Al finalizar tu compra encontrarás un QR que te permitirá retirar el pedido en su totalidad.</p>
    <!-- <h1 class="px-4 text-2xl font-semibold">Tu Pedido</h1> -->
    <div class="h-5"></div>
    <!-- Scrollable content -->
    <div v-if="cartItems.length > 0" class="flex-1 overflow-hidden pb-5">
      <div class="h-full overflow-auto">
        <div class="flex flex-col gap-1">
          <TransitionGroup name="list">
            <div v-for="item in cartItems" :key="item.name" class="w-full flex flex-col flex-none transform transition-all duration-300">
              <div class="flex items-center gap-4 bg-[#FBF2FF] border rounded-2xl px-2">
                <img :src="item.image_url" :alt="item.name" class="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
                <div class="flex flex-col justify-between h-full py-1 min-w-0 flex-1">
                  <div class="flex flex-col">
                    <h1 class="text-black text-md font-semibold truncate">{{ item.name }}</h1>
                    <p class="text-gray-500 text-xs truncate">{{ item.description }}</p>
                  </div>
                  <h2 class="text-black text-md font-semibold">$ {{ item.price }}</h2>
                </div>
                <div class="flex items-center flex-shrink-0">
                  <div v-if="item.quantity > 1" @click="decreaseQuantity(item)" class="rounded-full bg-[#BE38F3] h-6 w-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M19 13H5v-2h14v2z" fill="currentColor" />
                    </svg>
                  </div>
                  <div v-else @click="removeFromCart(item)" class="rounded-full bg-[#BE38F3] h-6 w-6 flex items-center justify-center">
                    <img src="/bin.png" alt="Vue logo" class="h-3" />
                  </div>
                  <div class="w-10 h-10 flex font-semibold text-xl items-center justify-center text-black">
                    {{ item.quantity }}
                  </div>
                  <div @click="increaseQuantity(item)" class="rounded-full bg-[#BE38F3] h-6 w-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="h-2"></div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div v-else class="flex-1 flex flex-col items-center justify-center">
      <p class="text-xl">Tu carrito está vacío.</p>
    </div>

    <div v-show="showPhoneModal" class="fixed inset-0 bg-black/70 flex items-center justify-center px-5" @click="this.showPhoneModal.value = false">
      <div class="bg-[#2F2E2F] w-full rounded-xl p-6">
        <!-- Header -->
        <div class="justify-between items-center mb-4 grid grid-cols-4">
          <p class="text-white text-xs col-span-3">Dejanos tu numero para notificarte cuando tu orden este lista!</p>
          <button @click="showPhoneModalSwitch()" class="text-white hover:text-gray-300 justify-self-end pr-1">✕</button>
        </div>

        <!-- Phone Input Section -->
        <div class="flex gap-2 mb-6">
          <!-- Country Code Select (disabled) -->
          <div class="flex-none w-20">
            <div class="h-12 px-3 bg-[#1C1C1E] rounded-lg flex items-center text-white border border-gray-600">
              <span>🇦🇷<span></span>+54</span>
            </div>
          </div>

          <!-- Phone Input -->
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="Ingresa tu celular"
            class="flex-1 w-full h-12 px-4 bg-[#1C1C1E] rounded-lg text-white border border-gray-600 focus:border-[#BE38F3] focus:outline-none"
            maxlength="10"
            @input="validatePhoneNumber"
          />
        </div>

        <!-- Submit Button -->
        <button
          @click="submitPhone"
          :disabled="!isValidPhone"
          :class="[
            'w-full py-3 rounded-xl text-center text-lg transition-colors',
            isValidPhone ? 'bg-[#6DF338] text-black hover:bg-[#5ED32E]' : 'bg-gray-600 text-gray-400 cursor-not-allowed',
          ]"
        >
          Continuar
        </button>
      </div>
    </div>

    <!-- Fixed bottom section -->
    <!-- <div class="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] px-4">
      <div v-show="cartItems.length > 0" class="flex w-full text-xl justify-between pt-4 pb-4">
        <p class="text-gray-300">Total:</p>
        <p class="font-semibold">
          $ {{ new Intl.NumberFormat('en-US').format(cartTotal.value) }}
        </p>
      </div>
      
      <button 
        :disabled="isLoading" 
        @click="askLink()" 
        v-if="cartTotal.value > 0" 
        class="w-full bg-[#6DF338] text-black py-3 text-xl text-center rounded-xl mb-6"
      >
        <div v-if="isLoading" class="flex items-center justify-center">
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </div>
        <p v-else>Ir a pagar</p>
      </button>
    </div> -->
    <!-- Fixed bottom section -->
    <div class="bg-[#1C1C1E]">
      <!-- Tips section -->
      <div v-show="cartItems.length > 0" class="">
        <p class="text-gray-300 mb-3">Apoyá a NQ con un extra</p>
        <div class="flex justify-between">
          <button
            v-for="option in tipOptions"
            :key="option.value"
            @click="selectTip(option)"
            :class="[
              'py-2 w-20 text-xs rounded-xl text-center transition-colors',
              selectedTip === option.value ? 'bg-[#1C1C1E] border  border-[#BE38F3] text-white' : 'bg-[#1C1C1E] border  border-white text-white',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Total section -->
      <div v-show="cartItems.length > 0" class="flex w-full text-md justify-between pt-4 pb-4">
        <div class="flex flex-col gap-2">
          <p v-if="tipAmount > 0" class="text-gray-300">Extra:</p>
          <p class="text-white font-semibold">Total:</p>
        </div>
        <div class="flex flex-col gap-2 items-end">
          <p v-if="tipAmount > 0" class="text-gray-300">$ {{ new Intl.NumberFormat('en-US').format(tipAmount) }}</p>
          <p class="font-semibold">$ {{ new Intl.NumberFormat('en-US').format(finalTotal) }}</p>
        </div>
      </div>

      <button :disabled="isLoading" @click="askLink()" v-if="cartTotal.value > 0" class="w-full bg-[#6DF338] text-black py-3 text-xl text-center rounded-xl mb-6">
        <div v-if="isLoading" class="flex items-center justify-center">
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </div>
        <p v-else>Ir a pagar</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { computed, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { TransitionGroup, watch } from 'vue'

const phoneNumber = ref('')
const isLoading = ref(false)
const showPhoneModal = ref(false)
const selectedTip = ref(null)
const tipAmount = ref(0)

const auth = getAuth()
const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.state.cartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const finalTotal = computed(() => cartTotal.value.value + tipAmount.value)

const tipOptions = [
  { label: '5%', value: 0.05 },
  { label: '10%', value: 0.1 },
  { label: '15%', value: 0.15 },
  { label: '20%', value: 0.2 },
]

const showPhoneModalSwitch = () => {
  showPhoneModal.value = !showPhoneModal.value
}

const isValidPhone = computed(() => phoneNumber.value.length === 10)

const validatePhoneNumber = () => {
  // Only allow numbers
  phoneNumber.value = phoneNumber.value.replace(/[^0-9]/g, '')
}

const submitPhone = async () => {
  if (!isValidPhone.value) return

  const user = await new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })

  if (!user) {
    router.push('/auth')
    return
  }

  try {
    const idToken = await user.getIdToken()
    // Here you can also make the API call if needed
    const response = await fetch('https://api.nqpay.lat/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        phone: `54${phoneNumber.value}`,
      }),
    })

    if (response.ok) {
      localStorage.setItem('phone', phoneNumber.value)
      // Close the modal
      showPhoneModal.value = false
      askLink()
    }
  } catch (error) {
    console.error('Error saving phone number:', error)
  }
}

watch(
  () => cartTotal.value.value,
  (newTotal) => {
    if (selectedTip.value !== null) {
      tipAmount.value = Math.round(newTotal * selectedTip.value)
    }
  }
)

function selectTip(option) {
  if (selectedTip.value === option.value) {
    selectedTip.value = null
    tipAmount.value = 0
  } else {
    // Si es una opción diferente, la seleccionamos normalmente
    selectedTip.value = option.value
    tipAmount.value = Math.round(cartTotal.value.value * option.value)
  }
}

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

const askLink = async () => {
  if (isLoading.value) return
  if (!localStorage.getItem('phone')) {
    showPhoneModal.value = true
    return
  }

  isLoading.value = true

  try {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe()
          resolve(user)
        },
        (error) => {
          unsubscribe()
          reject(error)
        }
      )
    })

    if (!user) {
      router.push('/auth')
      return
    }

    const idToken = await user.getIdToken()
    let venueName = window.location.hostname.split('.')[0]
    if (window.location.hostname === 'localhost') {
      venueName = 'nq'
    }
    const response = await fetch(`https://api.nqpay.lat/venues/${venueName}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        products: cartItems.value,
        tip: tipAmount.value,
      }),
    })
    const data = await response.json()
    window.location.href = data.Message
  } catch (error) {
    console.error('Error al procesar el pago:', error)
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
