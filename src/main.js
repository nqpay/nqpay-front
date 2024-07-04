import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import './style.css'
import Home from './components/Home.vue'
import EventsList from './components/EventsList.vue'
import Menu from './components/Menu.vue'
import Product from './components/Product.vue'
import Cart from './components/Cart.vue'
import Admin from './components/Admin.vue'

const app = createApp(App)
const pinia = createPinia()

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/admin', component: Admin },
    { path: '/events', component: EventsList },
    { path: '/menu/:event', component: Menu },
    { path: '/menu/:event/:product', component: Product },
    { path: '/cart', component: Cart },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

app.use(
  createAuth0({
    domain: 'dev-d0y1bpajet18zump.us.auth0.com',
    clientId: 'mWH9lOF0Jaonbh60Mt7TTSQpafGeBP14',
    authorizationParams: {
      redirect_uri: 'https://pay.nqpay.lat/admin',
    },
  })
)
app.use(pinia)
app.use(router)
app.mount('#app')
