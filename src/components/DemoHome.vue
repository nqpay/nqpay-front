<template>
  <div class="flex h-screen w-screen flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-center items-center">
      <!-- <img src="/question.png" alt="Vue logo" class="h-7" /> -->
      <img src="/logo.png" alt="Vue logo" class="h-20" />
      <!-- <img src="/cart.png" alt="Vue logo" class="h-7" /> -->
    </div>
    <div class="h-5"></div>
    <h1 class="text-3xl font-semibold mt-4">Vamos a escabiarrr</h1>
    <div class="h-5"></div>
    <img src="/FondoCardMid.png" alt="Vue logo" class="rounded-lg w-full" />
    <div class="h-10"></div>
    <div class="h-14 rounded-lg  bg-[#BE38F3] flex items-center justify-center">
      <router-link to="/menu/NQ Fest" class="text-xl">Ir al menú de tragos</router-link>
      <!-- <a href="/menu/NQ Fest" class="text-xl">Ir al menu de tragos</a> -->
    </div>
  </div>
  <NavBar currentView="Home" />
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>
