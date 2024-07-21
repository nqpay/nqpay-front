import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createAuth0 } from '@auth0/auth0-vue'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import App from './App.vue'
import './style.css'
import Home from './components/Home.vue'
import EventsList from './components/EventsList.vue'
import Menu from './components/Menu.vue'
import Product from './components/Product.vue'
import Cart from './components/Cart.vue'
import Admin from './components/Admin.vue'
import Profile from './components/Profile.vue'
import Auth from './components/Auth.vue'
import Checkout from './components/Checkout.vue'
import Success from './components/Success.vue'
import Scanner from './components/Scanner.vue'
import Order from './components/Order.vue'
import CompleteProfile from './components/CompleteProfile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/admin', component: Admin },
    { path: '/auth', component: Auth },
    { path: '/events', component: EventsList, meta: { requiresAuth: true } },
    { path: '/menu/:event', component: Menu, meta: { requiresAuth: true } },
    { path: '/menu/:event/:product', component: Product, meta: { requiresAuth: true } },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/order/:id', component: Order, meta: { requiresAuth: true } },
    { path: '/scanner', component: Scanner }, // TODO: Protect route with Auth0
    { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/success', component: Success, meta: { requiresAuth: true } },
    { path: '/complete-profile', component: CompleteProfile, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      next()
    } else {
      localStorage.setItem('intendedRoute', to.fullPath)
      next('/auth')
    }
  } else {
    next()
  }
})

const firebaseConfig = {
  apiKey: 'AIzaSyDJAPDf3deoBUwCbvNWypE6h13zA63Ccdo',
  authDomain: 'nq-pay.firebaseapp.com',
  projectId: 'nq-pay',
  storageBucket: 'nq-pay.appspot.com',
  messagingSenderId: '647504287916',
  appId: '1:647504287916:web:5b81e8c3fe373cf765e709',
  measurementId: 'G-N7W53H1K14',
}

initializeApp(firebaseConfig)

app.use(
  createAuth0({
    domain: 'dev-d0y1bpajet18zump.us.auth0.com',
    clientId: 'mWH9lOF0Jaonbh60Mt7TTSQpafGeBP14',
    authorizationParams: {
      redirect_uri: 'https://pay.nqpay.lat/admin',
    },
  })
)
app.use(router)
app.mount('#app')
