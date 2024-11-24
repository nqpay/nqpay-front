<template>
  <section class="bg-[#1C1C1E] w-screen h-screen flex flex-col overflow-hidden fixed">
    <div v-show="imageLoaded" class="flex flex-col w-full h-full px-6">
      <div class="w-24 px-6 pt-6">
        <img 
          class="w-full object-cover" 
          :class="{ 'opacity-0': !imageLoaded }"
          src="/logo.png" 
          alt="logo" 
          @load="onImageLoad"
        />
      </div>
      
      <div class="flex-1 flex items-center justify-center">
        <div class="flex flex-col items-center space-y-6 px-6">
          <h1 class="text-3xl text-center font-bold leading-tight tracking-tight text-white max-w-xl">
            Gracias a todos por ser parte de nuestro primer test 💜
          </h1>
          
          <div class="text-white space-y-4 text-center max-w-md">
            <p class="text-xl">
              Estamos muy contentos con lo logrado hasta ahora y con cómo salió la NQ Fest!
            </p>
            <p class="text-lg">
              Gracias por la buena onda, por la paciencia y por ayudarnos a mejorar. Esto recién empieza 👾
            </p>
          </div>
        </div>
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