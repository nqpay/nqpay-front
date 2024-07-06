<template>
  <section class="bg-[#1C1C1E] w-screen h-screen justify-center flex items-center">
    <div class="flex flex-col items-center justify-center py-8 w-full px-10">
      <a v-if="!emailSent" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-16 h-16" src="/logo.png" alt="logo" />
      </a>
      <div v-if="!emailSent" class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-2">
          <h1 v-if="!signUpViewShow" class="pb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
          <h1 v-else class="pb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign up to your account</h1>

          <button
            @click="signInWithGoogle"
            class="flex items-center gap-3 justify-center border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 text-gray-400"
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
            <p>Log in with Google</p>
          </button>
          <button class="flex items-center gap-3 justify-center border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 text-white">
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
          </button>
          <div class="flex items-center gap-6">
            <div class="h-[2px] w-full my-4 bg-gray-600"></div>
            <p class="text-medium text-gray-400">or</p>
            <div class="h-[2px] w-full my-4 bg-[#374151]"></div>
          </div>
          <form class="space-y-4 md:space-y-6" v-on:submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                v-model="this.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresa tu mail"
                required=""
              />
            </div>

            <button
              v-if="!signUpViewShow"
              @click="login"
              type="submit"
              class="w-full text-white bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <button
              v-else
              @click="register"
              type="submit"
              class="w-full text-white bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <!-- <p v-if="!signUpViewShow" class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a @click="signUpView" class="font-medium hover:underline text-[#BE38F3]">Sign up</a>
            </p> -->
            <!-- <p v-else class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account yet?
              <a @click="signUpView" class="font-medium hover:underline text-[#BE38F3]">Sign in</a>
            </p> -->
          </form>
        </div>
      </div>
      <div v-else class="text-white w-full items-center justify-center flex flex-col gap-6">
        <img class="w-full px-10 object-cover mb-5" src="/email_sent.png" alt="email" />
        <h1 class="font-bold text-2xl">Login link is on the way!</h1>
        <p class="text-center">For security reasons, we’ve sent you an email that contains a link to log in nqpay.</p>
        <a href="mailto:">
          <button @click="" class="bg-[#BE38F3] focus:ring-4 focus:outline-none focus:ring-[#BE38F3] font-bold rounded-lg text-sm px-5 py-2 text-center">Open Mail</button>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  isSignInWithEmailLink,
} from 'firebase/auth'
export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      isLoggedIn: ref(false),
      signUpViewShow: ref(false),
      emailSent: ref(false),
      actionCodeSettings: {
        url: 'http://localhost:5173/auth',
        handleCodeInApp: true,
      },
      router: useRouter(),
    }
  },
  methods: {
    signUpView() {
      this.signUpViewShow = !this.signUpViewShow
    },
    login() {
      // console.log(this.email)
      sendSignInLinkToEmail(getAuth(), this.email, this.actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignInFirebaseAuth', this.email)
          console.log('email storage: ', window.localStorage.getItem('emailForSignInFirebaseAuth'))
          this.emailSent = true
        })
        .catch((error) => {
          console.log('err: ', error.message)
        })
    },
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, 'miaumiau123')
        .then((data) => {
          console.log('successfully registered')
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {})
        .catch((error) => {
          console.log(error.message)
        })
    },
  },
  mounted() {
    const auth = getAuth()
    if (isSignInWithEmailLink(auth, location.href)) {
      signInWithEmailLink(auth, window.localStorage.getItem('emailForSignInFirebaseAuth'), location.href)
        .then((result) => {
          this.router.push('/cart')
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.router.push('/')
        return
      } else {
        console.log('User is logged out')
        this.isLoggedIn = false
      }
    })
  },
}
</script>
