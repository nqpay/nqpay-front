<template>
  <div class="flex flex-col bg-[#1C1C1E] h-screen text-white p-8 pb-20">
    <div class="flex justify-between items-center">
      <img src="/question.png" alt="Vue logo" class="h-7" />
      <img src="/logo.png" alt="Vue logo" class="h-20" />
      <img src="/cart.png" alt="Vue logo" class="h-7" />
    </div>
    <div class="h-5"></div>
    <h1 class="text-3xl font-bold mt-4">Dónde nos vemos hoy?</h1>
    <div class="h-5"></div>
    <div v-for="(eventGroup, index) in groupedEvents" :key="index" class="flex gap-4 mb-5">
      <div v-for="event in eventGroup" :key="event.name" @click="navigateToVenue(event)" class="h-48 w-1/2 bg-white rounded-2xl flex flex-col">
        <div class="w-full h-3/4 rounded-t-2xl overflow-hidden">
          <img :src="'/' + event.name.toLowerCase() + '.png'" :alt="event.name + ' logo'" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-black pt-1 px-2 text-lg font-bold">{{ event.name }}</h1>
      </div>
    </div>
  </div>
  <NavBar currentView="Events" />
</template>

<script setup>
import { defineEmits, onMounted, ref, computed } from 'vue'
import NavBar from './NavBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['changeView'])
const events = ref([])

function changeView(view) {
  emit('changeView', view)
}

function groupEvents(events, groupSize) {
  const grouped = []
  if (events.length > groupSize) {
    for (let i = 0; i < events.length; i += groupSize) {
      grouped.push(events.slice(i, i + groupSize))
    }
  } else {
    grouped.push(events)
  }
  return grouped
}

const groupedEvents = computed(() => groupEvents(events.value, 2))

function navigateToVenue(venue) {
  localStorage.setItem('venue', JSON.stringify(venue))
  router.push(`/menu/${venue.name.toLowerCase()}`)
}

onMounted(async () => {
  const response = await fetch(`https://api.nqpay.lat/venues/`)
  const data = await response.json()
  events.value = data
})
</script>
