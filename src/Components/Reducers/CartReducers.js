


export const AddToCartReducer = (state = { CartItems: [] }, action) => {

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        CartItems: action.payload
      }
    
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}



 