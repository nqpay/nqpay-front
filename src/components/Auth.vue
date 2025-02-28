<template>
  <section v-if="isLoading" class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center overflow-hidden">
    <!-- <h1 class="text-white text-2xl">Cargando...</h1> -->
    <img src="/loading_cup.gif" class="w-48" />
  </section>
  <section v-else class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center overflow-hidden relative">
    <div v-if="errorMessage" class="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-4 mb-4 text-sm text-white bg-red-600 rounded-lg shadow-lg">
      <p>{{ errorMessage }}</p>
    </div>

    <img v-if="showTyC" class="h-20 fixed top-10 left-10" src="/logo.png" alt="logo" />

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div v-show="showTyC" class="absolute bottom-0 left-0 right-0 h-[85%] bg-white rounded-t-3xl flex flex-col">
        <div class="flex-grow overflow-y-auto p-8 pb-20">
          <h1 class="text-xl font-bold mb-4">Términos y Condiciones</h1>
          <div>
            <p class="font-medium text-lg mb-2">1. Aceptación de los Términos y Condiciones</p>
            <p>
              Al registrarte o utilizar la plataforma de NQ Pay, aceptás y acordás cumplir con los presentes Términos y Condiciones. En caso de no estar de acuerdo con alguno de
              los siguientes puntos, no podrás utilizar el servicio.
            </p>
          </div>

          <!-- Sección 2: Descripción -->
          <div>
            <p class="font-medium text-lg mb-2">2. Descripción del Servicio</p>
            <p>
              NQ Pay es una plataforma que facilita el proceso de pedidos y pagos de bebidas en eventos y fiestas, permitiendo a los usuarios realizar pedidos desde su dispositivo
              móvil y retirarlos por la barra o el punto de retiro propuesto por el recinto físico.
            </p>
          </div>

          <!-- Sección 3: Registro -->
          <div>
            <p class="font-medium text-lg mb-2">3. Registro de Usuarios</p>
            <p>
              Para utilizar la aplicación, debes crear una cuenta con información válida y verídica. El registro y uso de la app está destinado únicamente a personas mayores de 18
              años. Al registrarte, confirmás que cumplís con la mayoría de edad.
            </p>
          </div>

          <!-- Sección 4: Uso -->
          <div>
            <p class="font-medium text-lg mb-2">4. Uso de la Aplicación</p>
            <p>La aplicación está diseñada para facilitar la compra de bebidas en eventos específicos y no garantiza disponibilidad de productos ni tiempos exactos de entrega.</p>
          </div>

          <!-- Sección 5: Disponibilidad -->
          <div>
            <p class="font-medium text-lg mb-2">5. Disponibilidad de Productos</p>
            <p>
              NQ Pay no garantiza que todos los productos mostrados en el menú estarán disponibles en el momento de la compra. El stock de bebidas es administrado por el recinto y
              no por la plataforma.
            </p>
            <p class="mt-2">
              Si el usuario realiza el pedido de un producto que no está disponible, NQ Pay se compromete a realizar el reembolso del importe correspondiente de manera oportuna.
              Por problemas de este estilo, por favor contactarse con ayuda@nqpay.lat
            </p>
          </div>

          <!-- Sección 6: Proceso de Pedido -->
          <div>
            <p class="font-medium text-lg mb-2">6. Proceso de Pedido y Pago</p>
            <p>Para realizar un pedido, el usuario debe:</p>
            <ul class="list-disc pl-6 mt-2 space-y-2">
              <li>
                Seleccionar el producto desde el menú disponible en el evento, luego de haber escaneado con la cámara de su smartphone el código QR que se encuentra en el recinto.
              </li>
              <li>Confirmar la cantidad y realizar el pago mediante la plataforma Mercado Pago, el único método de pago aceptado en la aplicación.</li>
            </ul>
          </div>

          <!-- Sección 7: Pagos -->
          <div>
            <p class="font-medium text-lg mb-2">7. Responsabilidad en el Procesamiento de Pagos</p>
            <p>
              Los pagos en NQ Pay se procesan exclusivamente a través de la plataforma de Mercado Pago. NQ Pay no es responsable por problemas de conexión, errores en el
              procesamiento de pagos, rechazo de transacciones o cualquier otro inconveniente derivado del uso de Mercado Pago.
            </p>
          </div>

          <!-- Sección 8: Retiro -->
          <div>
            <p class="font-medium text-lg mb-2">8. Retiro del Pedido</p>
            <p>
              Una vez confirmado el pedido, la plataforma le arrojará un código QR al usuario, que deberá utilizar para retirar su pedido en la barra o punto de recogida designado
              en el evento. Es responsabilidad del usuario monitorear el estado del pedido y retirarlo antes de que finalice el evento.
            </p>
          </div>

          <!-- Sección 9: Responsabilidad -->
          <div>
            <p class="font-medium text-lg mb-2">9. Responsabilidad del Usuario en el Consumo de Alcohol</p>
            <p>
              El consumo de bebidas alcohólicas está estrictamente limitado a usuarios mayores de 18 años. NQ Pay puede solicitar identificación en cualquier momento. El usuario es
              responsable del consumo de alcohol y sus consecuencias.
            </p>
          </div>

          <!-- Sección 10: Reembolsos -->
          <div>
            <p class="font-medium text-lg mb-2">10. Política de Reembolsos y Cancelaciones</p>
            <p>
              No se permiten cancelaciones de pedidos una vez confirmados y pagados, exceptuando los casos de error técnico o falta de stock del producto solicitado, donde se
              procederá a un reembolso total del producto por las vías que NQ Pay indique. Por problemas de este estilo, por favor contactarse con ayuda@nqpay.lat
            </p>
          </div>

          <!-- Sección 11: Datos -->
          <div>
            <p class="font-medium text-lg mb-2">11. Uso de Datos Personales</p>
            <p>
              NQ Pay recopila y utiliza información personal del usuario conforme a nuestra Política de Privacidad. Al utilizar la plataforma, consentís que NQ Pay utilice tus
              datos conforme a esta política.
            </p>
          </div>

          <!-- Sección 12: Modificaciones -->
          <div>
            <p class="font-medium text-lg mb-2">12. Modificación de los Términos y Condiciones</p>
            <p>
              NQ Pay se reserva el derecho de actualizar estos Términos y Condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios mediante la plataforma.
            </p>
          </div>

          <!-- Sección 13: Jurisdicción -->
          <div>
            <p class="font-medium text-lg mb-2">13. Jurisdicción y Ley Aplicable</p>
            <p>Estos Términos y Condiciones se regirán por las leyes vigentes en la jurisdicción donde se encuentre el usuario o donde se realice el evento.</p>
          </div>

          <!-- Sección 14: Contacto -->
          <div>
            <p class="font-medium text-lg mb-2">14. Contacto</p>
            <p>Para consultas o comentarios sobre los Términos y Condiciones, podés contactarnos a través del correo electrónico: ayuda@nqpay.lat</p>
          </div>
        </div>
        <div v-on:click="showTyC = false" class="fixed bottom-2 left-8 right-8 bg-[#BE38F3] py-3 text-white font-semibold text-xl text-center rounded-xl">Volver</div>
      </div>
    </transition>
    <div class="flex flex-col items-center justify-center py-8 w-full px-10">
      <a v-if="!emailSent" class="flex items-center mb-6 text-2xl font-semibold text-white">
        <img class="h-20" src="/logo.png" alt="logo" />
      </a>
      <div v-if="!emailSent" class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div class="p-6 space-y-2">
          <h1 class="pb-4 text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Accedé a tu cuenta</h1>

          <button
            :disabled="!tyc_accepted"
            @click="signInWithGoogle"
            class="flex items-center gap-3 justify-center border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 text-gray-400"
            :class="{ 'opacity-50 cursor-not-allowed': !tyc_accepted }"
          >
            <div class="w-5">
              <svg class="eUuXwBkW5W4__eatjSfd RRXFBumaW2SHdseZaWm6 _gmxfZ2BpOHxa6nWwqBB" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_13183_10121)">
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  ></path>
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <p>Continuar con Google</p>
          </button>
          <!-- <button class="flex items-center gap-3 justify-center border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 text-white">
            <div class="w-5">
              <svg
                class="eUuXwBkW5W4__eatjSfd RRXFBumaW2SHdseZaWm6 _gmxfZ2BpOHxa6nWwqBB g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_13183_29163)">
                  <path
                    d="M18.6574 15.5863C18.3549 16.2851 17.9969 16.9283 17.5821 17.5196C17.0167 18.3257 16.5537 18.8838 16.1969 19.1936C15.6439 19.7022 15.0513 19.9627 14.4168 19.9775C13.9612 19.9775 13.4119 19.8479 12.7724 19.585C12.1308 19.3232 11.5412 19.1936 11.0021 19.1936C10.4366 19.1936 9.83024 19.3232 9.18162 19.585C8.53201 19.8479 8.00869 19.985 7.60858 19.9985C7.00008 20.0245 6.39356 19.7566 5.78814 19.1936C5.40174 18.8566 4.91842 18.2788 4.33942 17.4603C3.71821 16.5863 3.20749 15.5727 2.80738 14.4172C2.37887 13.1691 2.16406 11.9605 2.16406 10.7904C2.16406 9.45009 2.45368 8.29407 3.03379 7.32534C3.4897 6.54721 4.09622 5.9334 4.85533 5.4828C5.61445 5.03219 6.43467 4.80257 7.31797 4.78788C7.80129 4.78788 8.4351 4.93738 9.22273 5.2312C10.0081 5.52601 10.5124 5.67551 10.7335 5.67551C10.8988 5.67551 11.4591 5.5007 12.4088 5.15219C13.3069 4.82899 14.0649 4.69517 14.6859 4.74788C16.3685 4.88368 17.6327 5.54699 18.4734 6.74202C16.9685 7.65384 16.2241 8.93097 16.2389 10.5693C16.2525 11.8454 16.7154 12.9074 17.6253 13.7506C18.0376 14.1419 18.4981 14.4444 19.0104 14.6592C18.8993 14.9814 18.7821 15.29 18.6574 15.5863V15.5863ZM14.7982 0.400358C14.7982 1.40059 14.4328 2.3345 13.7044 3.19892C12.8254 4.22654 11.7623 4.82035 10.6093 4.72665C10.5947 4.60665 10.5861 4.48036 10.5861 4.34765C10.5861 3.38743 11.0041 2.3598 11.7465 1.51958C12.1171 1.09416 12.5884 0.740434 13.16 0.458257C13.7304 0.18029 14.2698 0.0265683 14.7772 0.000244141C14.7921 0.133959 14.7982 0.267682 14.7982 0.400345V0.400358Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_13183_29163"><rect width="20" height="20" fill="white" transform="translate(0.5)"></rect></clipPath>
                </defs>
              </svg>
            </div>

            <p class="text-gray-400">Log in with Apple</p>
          </button> -->
          <div class="flex items-center gap-6">
            <div class="h-[2px] w-full my-4 bg-gray-600"></div>
            <p class="text-medium text-gray-400">sino</p>
            <div class="h-[2px] w-full my-4 bg-[#374151]"></div>
          </div>
          <form class="space-y-4 md:space-y-6" v-on:submit.prevent="login">
            <div>
              <!-- <label for="email" class="block mb-2 text-sm font-medium text-white">Correo electrónico</label> -->
              <input
                v-model="this.email"
                type="email"
                name="email"
                id="email"
                class="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresá tu correo electrónico"
                required=""
              />
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input v-model="tyc_accepted" type="checkbox" class="h-4 w-4 text-[#BE38F3] border-gray-300 rounded" />
              </div>
              <div class="ml-2 text-sm">
                <label for="remember" class="text-white">
                  He leído y acepto los <a @click.prevent="showTyC = true" class="font-medium text-[#6DF338] hover:underline cursor-pointer">términos y condiciones</a>
                </label>
              </div>
            </div>
            <button
              :disabled="!tyc_accepted"
              type="submit"
              class="w-full text-white bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="{ 'opacity-50 cursor-not-allowed': !tyc_accepted }"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div v-else class="text-white w-full items-center justify-center flex flex-col gap-6">
        <img class="w-full px-10 object-cover mb-5" src="/email_sent.png" alt="email" />
        <h1 class="font-bold text-2xl">Revisá tu e-mail</h1>
        <p class="text-center">Por cuestiones de seguridad, te enviamos un link de acceso a tu e-mail.<br />Por favor revisá tu casilla para continuar.</p>
        <!-- <a href="mailto:">
          <button @click="" class="bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-bold rounded-lg text-sm px-5 py-2 text-center">Open Mail</button>
        </a> -->
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, isSignInWithEmailLink } from 'firebase/auth'

export default {
  name: 'Auth',
  data() {
    return {
      showTyC: false,
      tyc_accepted: true,
    }
  },
  methods: {},
  setup() {
    const errorMessage = ref('')
    const router = useRouter()
    const email = ref('')
    const isLoggedIn = ref(false)
    const emailSent = ref(false)
    const isLoading = ref(true)
    const venueName = ref('')
    let unsubscribe = null

    venueName.value = window.location.hostname.split('.')[0]
    const actionCodeSettings = {
      url: `https://${venueName.value}.nqpay.lat/auth?email=${encodeURIComponent(email.value)}&intendedRoute=${encodeURIComponent(localStorage.getItem('intendedRoute'))}`,
      handleCodeInApp: true,
    }

    const handleAuthentication = async (user) => {
      if (user) {
        const hasCompletedProfile = await checkProfileCompletion(user)
        if (hasCompletedProfile) {
          // TODO: agregar aca la busqueda del query param intendedRoute
          const url = new URL(window.location.href)
          let intendedRoute = url.searchParams.get('intendedRoute')
          if (!intendedRoute || intendedRoute == '') {
            intendedRoute = localStorage.getItem('intendedRoute')
          }

          if (intendedRoute && intendedRoute != '') {
            console.log('Redirigiendo a la ruta prevista:', intendedRoute)
            await router.push(intendedRoute)
            localStorage.removeItem('intendedRoute')
          } else {
            console.log('Redirigiendo al inicio')
            await router.push('/')
          }
        } else {
          console.log('Redirigiendo a completar perfil')
          await router.push('/complete-profile')
        }
      } else {
        console.log('Usuario no autenticado')
      }
    }

    const checkProfileCompletion = async (user) => {
      const idToken = await user.getIdToken()
      try {
        const response = await fetch(`https://api.nqpay.lat/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        const data = await response.json()
        var phone = ''
        if (data.Phone) {
          phone = data.Phone
        }
        localStorage.setItem('name', data.Name)
        localStorage.setItem('phone', phone)
        return data.Status
      } catch (error) {
        console.error('Error al verificar el perfil del usuario:', error)
        return false
      }
    }

    const login = async () => {
      try {
        const venueName = window.location.hostname.split('.')[0]
        const settings = {
          ...actionCodeSettings,
          url: `https://${venueName}.nqpay.lat/auth?email=${encodeURIComponent(email.value)}&intendedRoute=${encodeURIComponent(localStorage.getItem('intendedRoute'))}`,
        }
        await sendSignInLinkToEmail(getAuth(), email.value, settings)
        localStorage.setItem('emailForSignInFirebaseAuth', email.value)
        emailSent.value = true
      } catch (error) {
        console.error('Error al enviar el enlace de inicio de sesión:', error)
      }
    }

    const signInWithGoogle = async () => {
      isLoading.value = true
      try {
        const provider = new GoogleAuthProvider()
        // provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
        // provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
        const result = await signInWithPopup(getAuth(), provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const accessToken = credential.accessToken
        // console.log('Google Access Token:', accessToken) access token from google to hit Google's People API
      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error)
        isLoading.value = false
      }
    }

    const handleEmailLink = async () => {
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailForSignIn = localStorage.getItem('emailForSignInFirebaseAuth')
        localStorage.removeItem('emailForSignInFirebaseAuth')

        // If email is not in localStorage, try to get it from URL parameters
        if (!emailForSignIn) {
          const urlParams = new URLSearchParams(window.location.search)
          emailForSignIn = urlParams.get('email')
        }

        if (emailForSignIn) {
          try {
            await signInWithEmailLink(auth, emailForSignIn, window.location.href)
            // onAuthStateChanged will handle the rest
          } catch (e) {
            // Extraer el código de error y crear un mensaje amigable
            console.log('Error al iniciar sesión con enlace de email:', e)
            if (e.code) {
              console.log('Código de error:', e.code)
              switch (e.code) {
                case 'auth/invalid-action-code':
                  errorMessage.value = 'El enlace de verificación no es válido o ha expirado.'
                  break
                case 'auth/expired-action-code':
                  errorMessage.value = 'El enlace de verificación ha expirado. Por favor, solicita uno nuevo.'
                  break
                case 'auth/user-disabled':
                  errorMessage.value = 'Esta cuenta ha sido deshabilitada.'
                  break
                default:
                  errorMessage.value = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.'
                  break
              }
            } else {
              errorMessage.value = 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo.'
            }

            // Imprimir el mensaje de error personalizado
            console.error('Error al iniciar sesión con enlace de email:', errorMessage.value)
            isLoading.value = false
          }
        } else {
          console.error('No se encontró el email para el inicio de sesión')
          isLoading.value = false
          // Optionally, you can prompt the user to enter their email here
        }
      }
    }

    onMounted(async () => {
      const auth = getAuth()

      // Manejar el enlace de email primero
      await handleEmailLink()

      unsubscribe = onAuthStateChanged(auth, async (user) => {
        isLoading.value = true
        if (user) {
          await handleAuthentication(user)
        } else {
          isLoggedIn.value = false
        }
        isLoading.value = false
      })
    })

    onUnmounted(() => {
      if (unsubscribe) unsubscribe()
    })

    return {
      errorMessage,
      email,
      isLoggedIn,
      emailSent,
      isLoading,
      login,
      signInWithGoogle,
    }
  },
}
</script>
<style scoped>
/* Asegúrate de que el contenedor principal no tenga scroll */
section {
  overflow: hidden;
}

/* Estilo para el contenedor de Términos y Condiciones */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch; /* Para un desplazamiento suave en iOS */
}
</style>
