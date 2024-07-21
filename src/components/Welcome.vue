<template>
  <section class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center">
    <div class="flex flex-col items-center justify-center py-8 w-full px-10">
      <div class="p-6 space-y-2">
        <h1 class="pb-4 text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Pedís, pagás <br />y retirás en la barra</h1>
      </div>

      <div class="text-white w-full items-center justify-center flex flex-col gap-6">
        <img class="w-full px-20 object-cover mb-4" src="/logo.png" alt="email" />
        <p class="font-medium text-center">
          Comprá tus tragos sin hacer fila <br />
          y disfrutá de tu noche sin interrupciones
        </p>
        <router-link to="/auth">
          <div class="w-20 h-20 bg-[#BE38F3] py-3 text-xl text-center rounded-full cursor-pointer flex items-center justify-center absolute bottom-20 right-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="w-10">
              <path style="fill: #ffffff" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right" />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Welcome',
}
</script>
