<template>
  <div class="fixed inset-0 flex flex-col bg-[#1C1C1E] text-white p-8 pb-20 overflow-hidden">
    <div class="flex justify-center items-center">
      <img src="/logo.png" alt="Vue logo" class="h-20" />
    </div>
    <div class="h-5"></div>
    <h1 class="text-3xl font-semibold mt-4">1, 2, 3, probando...</h1>
    <div class="h-5"></div>
    <div class="flex relative mb-5">
      <img src="/FondoCardMid.png" alt="Vue logo" class="rounded-lg w-full" />
    </div>
    <router-link :to="`/menu/${venueName}`" class="mb-5 h-14 rounded-lg bg-[#BE38F3] flex items-center justify-center">
      <p class="text-xl">Ir al menú de tragos</p>
    </router-link>
    <router-link to="/checkout" class="mb-10 h-14 rounded-lg border border-[#BE38F3] flex items-center justify-center">
      <p class="text-xl">Ir a mis pedidos</p>
    </router-link>
    <NavBar currentView="Home" />
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar,
  },
  computed: {
    venueName() {
      return window.location.hostname.split('.')[0]
    },
  },
}
</script>
