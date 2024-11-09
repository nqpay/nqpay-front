<template>
  <div class="fixed inset-0 flex flex-col bg-[#1C1C1E] text-white p-8 pb-20 overflow-hidden">
    <div class="flex justify-center items-center">
      <img src="/logo.png" alt="Vue logo" class="h-20" />
    </div>
    <div class="h-5"></div>
    <h1 class="text-3xl font-semibold mt-4">Vamos a escabiarrr</h1>
    <div class="h-5"></div>
    <div class="flex-1 relative">
      <img 
        src="/FondoCardMid.png" 
        alt="Vue logo" 
        class="rounded-lg w-full"
      />
    </div>
    <div class="mb-10 h-14 rounded-lg bg-[#BE38F3] flex items-center justify-center">
      <router-link to="/menu/NQ Fest" class="text-xl">Ir al menú de tragos</router-link>
    </div>
    <NavBar currentView="Home" />
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>