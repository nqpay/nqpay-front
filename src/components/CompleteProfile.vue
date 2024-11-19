<template>
  <section class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center">
    <div class="flex flex-col items-center justify-center py-8 w-full px-10">
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div class="p-6 space-y-2">
          <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">¿Sos mayor de edad?</h1>
          <h2 class="text-gray-400 pb-2">Para continuar, debes completar tus datos por única vez.</h2>

          <form class="space-y-4 md:space-y-6" v-on:submit.prevent="updateProfile">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-white">Nombre y Apellido</label>
              <input
                v-model="this.name"
                type="text"
                name="name"
                id="name"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre y Apellido"
                required=""
              />
            </div>
            <div>
              <label for="birthdate" class="block mb-2 text-sm font-medium text-white">Fecha de Nacimiento</label>
              <p v-if="birthdateError" class="text-red-500 text-sm mb-1">{{ birthdateError }}</p>
              <input
                v-model="displayBirthdate"
                type="text"
                name="birthdate"
                id="birthdate"
                @input="handleBirthdateInput"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="dd/mm/yyyy"
                required=""
                maxlength="10"
                inputmode="numeric"
              />
            </div>
            <div>
              <label for="dni" class="block mb-2 text-sm font-medium text-white">DNI (Sin puntos ni espacios)</label>
              <input
                v-model="this.dni"
                type="text"
                name="dni"
                id="dni"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="XXXXXXXX"
                required=""
                maxlength="8"
                inputmode="numeric"
                @input="handleDniInput"
              />
            </div>
            <div></div>
            <button
              type="submit"
              class="w-full text-white bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Continuar
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
      displayBirthdate: '',
      birthdateError: '',
      isLoggedIn: ref(false),
      router: useRouter(),
    }
  },
  methods: {
    handleDniInput(event) {
      // Solo permitimos números
      this.dni = event.target.value.replace(/\D/g, '');
    },
    handleBirthdateInput(event) {
      this.birthdateError = ''; // Limpiar error previo
      let value = event.target.value.replace(/\D/g, ''); // Solo permitimos números
      let original = this.displayBirthdate;
      
      // Si están borrando, permitimos borrar libremente
      if (original.length > event.target.value.length) {
        this.displayBirthdate = event.target.value.replace(/\//g, '');
        this.birthdate = this.displayBirthdate;
        return;
      }

      // Formateo para dd/mm/yyyy
      if (value.length >= 1) {
        const firstDigit = parseInt(value[0]);
        if (firstDigit > 3) {
          value = '0' + firstDigit + value.substring(1);
        }
      }

      if (value.length >= 2) {
        const day = parseInt(value.substring(0, 2));
        if (day > 31) {
          value = '31' + value.substring(2);
          this.birthdateError = 'El día no puede ser mayor a 31';
        } else if (day === 0) {
          value = '01' + value.substring(2);
          this.birthdateError = 'El día no puede ser 0';
        }
      }
      
      if (value.length >= 4) {
        const month = parseInt(value.substring(2, 4));
        if (month > 12) {
          value = value.substring(0, 2);
          this.birthdateError = 'El mes no puede ser mayor a 12';
          // Removemos los dígitos del mes inválido
        } else if (month === 0) {
          value = value.substring(0, 2) + '01';
          this.birthdateError = 'El mes no puede ser 0';
        }
      }
      
      // Formato visual con barras
      let formattedValue = value;
      if (value.length > 4) {
        formattedValue = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
      } else if (value.length > 2) {
        formattedValue = value.substring(0, 2) + '/' + value.substring(2);
      }

      this.displayBirthdate = formattedValue;
      this.birthdate = formattedValue;
    },

    async updateProfile() {
      // Validar la fecha antes de enviar
      if (!this.birthdate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        this.birthdateError = 'Por favor, completa la fecha en formato dd/mm/yyyy';
        return;
      }

      const [day, month, year] = this.birthdate.split('/');
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Verificar si es mayor de edad (18 años)
      if (age < 18) {
        this.birthdateError = 'Debes ser mayor de 18 años para continuar.';
        return;
      }
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
