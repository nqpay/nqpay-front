<template>
  <section class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center">
    <div class="flex flex-col items-center justify-center py-8 w-full px-10">
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div class="p-6 space-y-2">
          <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">¿Eres mayor de edad?</h1>
          <h2 class="text-gray-400 pb-4">Para continuar, necesitamos verificar tu edad.</h2>

          <form class="space-y-4 md:space-y-6" v-on:submit.prevent="updateProfile">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-white">Nombre Completo</label>
              <input
                v-model="this.name"
                type="text"
                name="name"
                id="name"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu nombre completo"
                required=""
              />
            </div>
            <div>
              <label for="birthdate" class="block mb-2 text-sm font-medium text-white">Fecha de Nacimiento</label>
              <input
                v-model="this.birthdate"
                type="date"
                name="birthdate"
                id="birthdate"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu fecha de nacimiento"
                required=""
              />
            </div>
            <div>
              <label for="dni" class="block mb-2 text-sm font-medium text-white">Documento Nacional de Identidad (DNI)</label>
              <input
                v-model="this.dni"
                type="text"
                name="dni"
                id="dni"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu numero de DNI"
                required=""
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirmar
            </button>

            <!-- <p v-if="!signUpViewShow" class="text-sm font-light text-gray-400">
              Don’t have an account yet?
              <a @click="signUpView" class="font-medium hover:underline text-[#BE38F3]">Sign up</a>
            </p> -->
            <!-- <p v-else class="text-sm font-light text-gray-400">
              Already have an account yet?
              <a @click="signUpView" class="font-medium hover:underline text-[#BE38F3]">Sign in</a>
            </p> -->
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
export default {
  name: 'Auth',
  data() {
    return {
      name: '',
      dni: '',
      birthdate: '',
      isLoggedIn: ref(false),
      router: useRouter(),
    }
  },
  methods: {
    async updateProfile() {
      try {
        const auth = getAuth()
        const idToken = await auth.currentUser.getIdToken()
        const result = await fetch('https://api.nqpay.lat/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            name: this.name,
            dni: this.dni,
            birthdate: this.birthdate,
          }),
        })
        let intendedRoute = localStorage.getItem('intendedRoute')
        //extract the intended route from the url params
        const url = new URL(window.location.href)
        const intendedRouteParam = url.searchParams.get('intendedRoute')
        if (intendedRouteParam) {
          intendedRoute = intendedRouteParam
        }

        if (intendedRoute) {
          this.$router.push(intendedRoute)
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Error al enviar el enlace de inicio de sesión:', error)
      }
    },
  },
}
</script>
