
export const productsReducer = (state = { products: [] }, action) => {

  switch (action.type) {

    case 'ALL_PRODUCTS_REQ':
      return {
        loading: true,
        products: []
      }
    case 'ALL_PRODUCTS_SUCCESS':
      return {
        loading: false,
        products: action.payload.products,
        ProductCount: action.payload.count, 
        totalProducts: action.payload.totalProducts, //total product
        prodperpage: action.payload.prodperpage
      }
    case 'ALL_PRODUCT_FAIL':
      return {
        loading: false,
        error: action.payload
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      }
     


    default:
      return state
  }
}

export const productDetails = (state = { product: {} }, action) => {

  switch (action.type) {

    case 'PRODUCT_REQ':
      return {
        loading: true,
        ...state
      }

    case 'PRODUCT_SUCCESS':
      return {
        loading: false,
        product: action.payload
      }

    case 'PRODUCT_FAIL':
      return {
        loading: false,
        ...state,
        error: action.payload
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      }


    default:
      return state
  }
} 