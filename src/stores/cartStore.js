// stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [],
    numberOfItems: 0,
  }),
  actions: {
    addToCart(product, quantity) {
      const existingProduct = this.cartItems.find((item) => item.product.name === product.name)
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        this.cartItems.push({ product, quantity })
      }
      this.numberOfItems += quantity
    },
    clearCart() {
      this.cartItems = []
      this.numberOfItems = 0
    },
    removeFromCart(product) {
      const cartItem = this.cartItems.find((item) => item.product.name === product.name)
      this.cartItems = this.cartItems.filter((item) => item.product.name !== product.name)
      this.numberOfItems -= cartItem.quantity
      if (isNaN(this.numberOfItems) || this.numberOfItems === -Infinity || this.numberOfItems === Infinity || this.numberOfItems === N || this.numberOfItems < 0) {
        this.numberOfItems = 0
      }
    },
    increaseQuantity(product) {
      const cartItem = this.cartItems.find((item) => item.product.name === product.name)
      if (cartItem) {
        cartItem.quantity++
      }
      this.numberOfItems++
    },
    decreaseQuantity(product) {
      const cartItem = this.cartItems.find((item) => item.product.name === product.name)
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--
      }
      this.numberOfItems--
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        const priceString = item.product.price
        let numberString = priceString.replace('$', '').replace('.', '')
        const priceInt = parseInt(numberString, 10)
        return total + priceInt * item.quantity
      }, 0)
    },
  },
})
