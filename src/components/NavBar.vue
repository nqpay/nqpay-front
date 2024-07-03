<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-[#1C1C1E] border-[#1C1C1E]">
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <router-link to="/">
        <div @click="changeView('Home')" class="inline-flex flex-col items-center justify-center px-5 mt-2">
          <img v-if="currentView == 'Home'" src="/house.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/house_deselected.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView == 'Home'" class="text-sm text-[#6Df338]">Home</span>
          <span v-else class="text-sm text-gray-500">Home</span>
        </div>
      </router-link>
      <router-link to="/events">
        <div @click="changeView('Events')" class="inline-flex flex-col items-center justify-center px-5 group mt-2">
          <img v-if="currentView == 'Events'" src="/eventos_icon.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/eventos_icon_deselected.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView == 'Events'" class="text-sm text-[#6Df338]">Eventos</span>
          <span v-else class="text-sm text-gray-500">Eventos</span>
        </div>
      </router-link>
      <router-link to="/notifications">
        <div class="inline-flex flex-col items-center justify-center px-5 group mt-2">
          <img src="/notification.png" alt="Vue logo" class="h-7 mb-1" />
          <span class="text-sm text-gray-500">Notificaciones</span>
        </div>
      </router-link>
      <button type="button" class="inline-flex flex-col items-center justify-center px-5 group">
        <img src="/profile.png" alt="Vue logo" class="h-7 mb-1" />
        <span class="text-sm text-gray-500">Perfil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['currentView'])
</script>
