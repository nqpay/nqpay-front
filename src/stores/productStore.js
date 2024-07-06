export const useProductStore = () => {
  const getSelectedProduct = () => {
    return JSON.parse(localStorage.getItem('selectedProduct'))
  }
  const setSelectedProduct = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
  }
  const clearSelectedProduct = () => {
    localStorage.removeItem('selectedProduct')
  }
  return {
    getSelectedProduct,
    setSelectedProduct,
    clearSelectedProduct,
  }
}
