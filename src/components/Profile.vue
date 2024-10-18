<template>
  <div class="bg-[#1C1C1E] h-screen w-screen flex flex-col px-10">
    <div class="mt-auto mb-20 flex flex-col gap-4">
      <!-- <button class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Terminos y Condiciones</button> -->
      <!-- <button class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Solicitar Ayuda</button> -->
      <button @click="handleSignOut" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Logout</button>
    </div>
    <NavBar currentView="Profile" />
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

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in')
      isLoggedIn.value = true
    } else {
      console.log('User is logged out')
      isLoggedIn.value = false
    }
  })
})
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign Out')
      router.push('/')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>
