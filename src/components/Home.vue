<template>
  <div class="flex flex-col bg-[#1C1C1E] text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <img src="/question.png" alt="Vue logo" class="h-7" />
      <img src="/logo.png" alt="Vue logo" class="h-20" />
      <img src="/cart.png" alt="Vue logo" class="h-7" />
    </div>
    <div class="h-5"></div>
    <h1 class="text-3xl font-bold mt-4">Hora de refrescar tu sed</h1>
    <div class="h-5"></div>
    <div class="rounded-xl w-full bg-white items-center grid grid-cols-4 p-2">
      <img src="/cerveza.png" alt="Vue logo" class="rounded-lg" />
      <div class="flex flex-col text-black col-span-2 px-3">
        <h1 class="pb-4 font-semibold">3x2 en Cerveza</h1>
        <div class="bg-[#BE38F3] w-max rounded-full">
          <p class="text-[.60rem] font-semibold py-2 px-2">Agregar al carrito</p>
        </div>
      </div>
      <div class="p-5">
        <img src="/bresh.png" alt="Vue logo" class="rounded-lg" />
      </div>
    </div>
    <div class="h-4"></div>
    <div class="rounded-xl w-full bg-white items-center grid grid-cols-4 p-2">
      <img src="/fernet.png" alt="Vue logo" class="rounded-lg" />
      <div class="flex flex-col text-black col-span-2 px-3">
        <h1 class="pb-4 font-semibold">Fernet a $3.000</h1>
        <div class="bg-[#BE38F3] w-max rounded-full">
          <p class="text-[.60rem] font-semibold py-2 px-2">Agregar al carrito</p>
        </div>
      </div>
      <div class="p-5">
        <img src="/banana.png" alt="Vue logo" class="rounded-lg" />
      </div>
    </div>
    <div class="h-4"></div>
    <div class="flex gap-4">
      <div class="h-48 w-1/2 bg-white rounded-2xl items-center flex flex-col">
        <img src="/favoritos.png" alt="Vue logo" class="rounded-t-2xl" />
        <h1 class="text-black pt-4 px-2 font-bold">FAVORITOS</h1>
      </div>
      <router-link to="/events" class="h-48 w-1/2 bg-white rounded-2xl items-center flex flex-col">
        <img src="/eventos.png" alt="Vue logo" class="rounded-t-2xl" />
        <h1 class="text-black pt-4 px-2 font-bold">EVENTOS</h1>
      </router-link>
    </div>
    <div class="h-4"></div>
    <img src="/polenta.png" alt="Vue logo" class="rounded-lg w-full" />
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
