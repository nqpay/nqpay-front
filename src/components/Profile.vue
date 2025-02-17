<template>
  <div class="bg-[#1C1C1E] fixed inset-0 flex flex-col px-10">
    <div v-if="isLoading" class="mt-20 flex flex-col gap-4 animate-pulse">
      <div class="h-8 bg-gray-600 rounded w-1/3"></div>
      <div class="h-10"></div>
      <div class="h-12 bg-gray-600 rounded w-full"></div>
      <div class="h-12 bg-gray-600 rounded w-full"></div>
    </div>

    <div v-else class="mt-20 flex flex-col gap-4 flex-1">
      <h1 class="text-white font-semibold text-2xl">Hola {{ name }} 👋🏻</h1>
      <p class="text-white font-regular">Gracias por formar parte de NQ</p>
      <div class="flex flex-col gap-4 mt-10">
        <button v-on:click="showTyC = true" class="bg-[#BE38F3] w-full text-white rounded-lg p-3">Términos y Condiciones</button>
        <button @click="handleSignOut" class="border border-[#BE38F3] w-full text-white rounded-lg p-3">Cerrar Sesión</button>
      </div>
      <div class="flex-1"></div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div v-show="showTyC" class="absolute bottom-0 left-0 right-0 h-[85%] bg-white rounded-t-3xl flex flex-col pb-20">
        <div class="flex-grow overflow-y-auto p-8 pb-4">
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
        <div v-on:click="showTyC = false" class="left-8 right-8 bg-[#BE38F3] py-3 text-white font-semibold text-xl text-center rounded-xl">Volver</div>
      </div>
    </transition>

    <NavBar v-if="!isLoading" currentView="Profile" class="fixed bottom-0 left-0 right-0" />
  </div>

  <Suspense>
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import NavBar from './NavBar.vue'

const showTyC = ref(false)
const router = useRouter()
const isLoggedIn = ref(false)
const isLoading = ref(true)
const name = ref(localStorage.getItem('name'))
let auth

const fetchUserName = async () => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(`https://api.nqpay.lat/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    const data = await response.json()
    localStorage.setItem('name', data.Name)
    name.value = data.Name
  } catch (error) {
    console.log('Error fetching user name:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in')
      isLoggedIn.value = true
      if (!name.value) {
        fetchUserName()
      } else {
        isLoading.value = false
      }
    } else {
      console.log('User is logged out')
      isLoggedIn.value = false
      isLoading.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign Out')
      router.push('/')
      localStorage.clear()
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>
