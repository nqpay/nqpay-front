import { reactive, computed } from 'vue'

export const useCartStore = () => {
  const state = reactive({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    numberOfItems: JSON.parse(localStorage.getItem('qty')) || 0,
    cartTotal: 0,
  })

  const saveState = () => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
    localStorage.setItem('qty', JSON.stringify(state.numberOfItems))
  }

  const addToCart = (product, quantity) => {
    const existingProduct = state.cartItems.find((item) => item.name === product.name)
    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      product.quantity = quantity
      state.cartItems.push(product)
    }
    state.numberOfItems += quantity
    saveState()
  }

  const clearCart = () => {
    state.cartItems = []
    state.numberOfItems = 0
    localStorage.removeItem('cart')
    localStorage.removeItem('qty')
  }

  const removeFromCart = (product) => {
    const cartItem = state.cartItems.find((item) => item.name === product.name)
    if (cartItem) {
      state.cartItems = state.cartItems.filter((item) => item.name !== product.name)
      state.numberOfItems -= cartItem.quantity
      if (isNaN(state.numberOfItems) || state.numberOfItems < 0) {
        state.numberOfItems = 0
      }
      saveState()
    }
  }

  const increaseQuantity = (product) => {
    const cartItem = state.cartItems.find((item) => item.name === product.name)
    if (cartItem) {
      cartItem.quantity++
      state.numberOfItems++
      saveState()
    }
  }

  const decreaseQuantity = (product) => {
    const cartItem = state.cartItems.find((item) => item.name === product.name)
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--
      state.numberOfItems--
      saveState()
    }
  }

  // computed(() => {
  //   state.cartTotal = state.cartItems.reduce((total, item) => {
  //     const priceString = item.price
  //     let numberString = priceString.replace('$', '').replace('.', '')
  //     const priceInt = parseInt(numberString, 10)
  //     return total + priceInt * item.quantity
  //   }, 0)
  // })
  const cartTotal = computed(() => {
    return state.cartItems.reduce((total, item) => {
      const priceString = item.price
      let numberString = priceString.replace('$', '').replace('.', '')
      const priceInt = parseInt(numberString, 10)
      return total + priceInt * item.quantity
    }, 0)
  })
  return {
    state,
    addToCart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  }
}
