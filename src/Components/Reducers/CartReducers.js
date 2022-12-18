
export const AddToCartReducer = (state = { CartItems: [], ShippingInfo:{} }, action) => {

  switch (action.type) {
    case "ADD_TO_CART":

      //out incomming item
      const item = action.payload

      //existing in cart
      const itemExist = state.CartItems.find(i => i.id === item.id)

      //if exist
      if (itemExist) {
        return {
          ...state,
          CartItems: state.CartItems.map(i => i.id === item.id ? item : i)
        }

        //adding new item
      } else {
        return {
          ...state,
          CartItems: [...state.CartItems, item]
        }
      }

    case "DELETE_FROM_CART":
      return {
        ...state,
        CartItems: state.CartItems.filter(i=> i.id!==action.payload.id )
      }

      case "ADD_SHIPPING_INFO":
      return {
        ...state,
        ShippingInfo: action.payload
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



