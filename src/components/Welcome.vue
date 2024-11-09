<template>
  <section class="bg-[#1C1C1E] w-screen h-screen flex items-center  overflow-hidden fixed">
    <div v-show="imageLoaded"  class="flex flex-col  w-full px-10">
      <div class="p-6 space-y-2">
        <h1 class="pb-4 text-3xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
          Pedís, pagás <br />y retirás en la barra
        </h1>
      </div>

      <div class="text-white w-full flex flex-col gap-6">
        <div class="w-full px-20 relative">
          <img 
            class="w-full object-cover mb-4" 
            :class="{ 'opacity-0': !imageLoaded }"
            src="/logo.png" 
            alt="email" 
            @load="onImageLoad"
          />
        </div>
        
        <p class="font-medium text-center">
          Comprá tus tragos sin hacer fila <br />
          y disfrutá de tu noche sin interrupciones
        </p>
        <router-link to="/auth">
          <div class="w-20 h-20 bg-[#BE38F3] py-3 text-xl text-center rounded-full cursor-pointer flex items-center justify-center fixed bottom-[5%] right-[5%]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="w-10">
              <path style="fill: #ffffff" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right" />
            </svg>
          </div>
        </router-link>
        <div class="pb-20"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      imageLoaded: false
    }
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true
    }
  }
}
</script>

<style scoped>
img {
  transition: opacity 0.3s ease;
}
img.opacity-0 {
  opacity: 0;
}
</style>