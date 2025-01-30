<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-[#1C1C1E] border-[#1C1C1E]">
    <div class="grid grid-cols-4 h-full font-medium">
      <router-link to="/" class="flex items-center justify-center">
        <div @click="changeView('Home')" class="inline-flex flex-col items-center justify-center">
          <img v-if="currentView == 'Home'" src="/house.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/house_deselected.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView == 'Home'" class="text-sm text-[#6Df338]">Home</span>
          <span v-else class="text-sm text-gray-500">Home</span>
        </div>
      </router-link>
      <router-link :to="`/menu/${venueName}`" class="flex items-center justify-center">
        <div @click="changeView('Events')" class="inline-flex flex-col items-center justify-center">
          <img v-if="currentView == 'Events'" src="/eventos_icon.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/eventos_icon_deselected.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView == 'Events'" class="text-sm text-[#6Df338]">Menú</span>
          <span v-else class="text-sm text-gray-500">Menú</span>
        </div>
      </router-link>
      <router-link to="/checkout" class="flex items-center justify-center">
        <div class="inline-flex flex-col items-center justify-center">
          <img v-if="currentView != 'Checkout'" src="/qr_icon.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/qr_icon_selected.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView != 'Checkout'" class="text-sm text-gray-500">Mis QR</span>
          <span v-else class="text-sm text-[#6Df338]">Mis QR</span>
        </div>
      </router-link>
      <router-link to="/profile" class="flex items-center justify-center">
        <div class="inline-flex flex-col items-center justify-center">
          <img v-if="currentView == 'Profile'" src="/profile_selected.png" alt="Vue logo" class="h-7 mb-1" />
          <img v-else src="/profile.png" alt="Vue logo" class="h-7 mb-1" />
          <span v-if="currentView != 'Profile'" class="text-sm text-gray-500">Perfil</span>
          <span v-else class="text-sm text-[#6Df338]">Perfil</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentView: {
      type: String,
      required: true,
    },
  },
  computed: {
    venueName() {
      return window.location.hostname.split('.')[0]
    },
  },
}
</script>
