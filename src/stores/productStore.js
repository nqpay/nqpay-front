import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    selectedProduct: null,
  }),
  actions: {
    setSelectedProduct(product) {
      this.selectedProduct = product
    },
    clearSelectedProduct() {
      this.selectedProduct = null
    },
  },
})
