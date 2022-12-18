

export const NewOrderReducer = (state = {}, action) => {

 
  switch (action.type) {

      case "CREATE_ORDER_REQUEST":
          return {
              ...state,
              loading: true
          }

      case "CREATE_ORDER_SUCCESS":
          return {
              loading: false,
              Message:action.payload.status,
              order: action.payload.order
          }

      case "CREATE_ORDER_FAIL":
          return {
              loading: false,
              error: action.payload
          }

      case "CLEAR_ERRORS":
          return {
              ...state,
              error: null
          }

      default:
          return state;
  }
}



export const GetOrderReducer = (state = {Orders:[]}, action) => {

 
    switch (action.type) {
  
        case "GET_ORDER_R":
            return {
                ...state,
                loading: true
            }
  
        case "GET_ORDER_S":
            return {
                loading: false,
                Message:action.payload.status,
                Orders: action.payload.order
            }
  
        case "GET_ORDER_F":
            return {
                loading: false,
                error: action.payload
            }
  
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }
  
        default:
            return state;
    }
  }

  export const GetSingleOrder = (state = {Order:{}}, action) => {

 
    switch (action.type) {
  
        case "SINGLE_ORDER_R":
            return {
                ...state,
                loading: true
            }
  
        case "SINGLE_ORDER_S":
            return {
                loading: false,
                Message:action.payload.status,
                Order: action.payload
            }
  
        case "SINGLE_ORDER_F":
            return {
                loading: false,
                error: action.payload
            }
  
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }
  
        default:
            return state;
    }
  }