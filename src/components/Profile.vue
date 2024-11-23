<template>
  <div class="bg-[#1C1C1E] fixed inset-0 flex flex-col px-10">
    <div v-if="isLoading" class="mt-20 flex flex-col gap-4 animate-pulse">
      <div class="h-8 bg-gray-600 rounded w-1/3"></div>
      <div class="h-10"></div>
      <div class="h-12 bg-gray-600 rounded w-full"></div>
      <div class="h-12 bg-gray-600 rounded w-full"></div>
    </div>
    
    <div v-else class="mt-20 flex flex-col gap-4 flex-1">
      <h1 class="text-white font-semibold text-2xl">Hola {{ name }} 👋🏻</h1>
      <p class="text-white font-regular">Gracias por formar parte de NQ</p>
      <div class="flex flex-col gap-4 mt-10">
        <button class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Términos y Condiciones</button>
        <button @click="handleSignOut" class="border border-[#BE38F3] w-full text-white rounded-lg p-3">Cerrar Sesión</button>
      </div>
      <div class="flex-1"></div>
    </div>

    <NavBar v-if="!isLoading" currentView="Profile" class="fixed bottom-0 left-0 right-0" />
  </div>

  <Suspense>
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import NavBar from './NavBar.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const isLoading = ref(true)
const name = ref(localStorage.getItem('name'))
let auth

const fetchUserName = async () => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(`https://api.nqpay.lat/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    const data = await response.json()
    localStorage.setItem('name', data.Name)
    name.value = data.Name
  } catch (error) {
    console.log('Error fetching user name:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in')
      isLoggedIn.value = true
      if (!name.value) {
        fetchUserName()
      } else {
        isLoading.value = false
      }
    } else {
      console.log('User is logged out')
      isLoggedIn.value = false
      isLoading.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign Out')
      router.push('/')
      localStorage.removeItem('name')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>