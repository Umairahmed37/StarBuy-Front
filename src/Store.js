import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//PRODUCT REDUCERS
import { productDetails, productsReducer } from './Components/Reducers/ProductReducers'

//USER REDUCERS
import { ChangePassReducer, ForgotPassReducer, UserLoginReducer, UserProfileUpdateReducer } from './Components/Reducers/UserReducers'

//CART REDUCERS
import { AddToCartReducer } from './Components/Reducers/CartReducers'

//ORDER REDUCERS
import { GetOrderReducer, NewOrderReducer,GetSingleOrder } from './Components/Reducers/OrderReducer'


const reducer = combineReducers({
  productsReducer,
  productDetails,
  UserLoginReducer,
  UpdateProfile: UserProfileUpdateReducer,
  ChangePassReducer,
  ForgotPassReducer,
  Cart: AddToCartReducer,
  NewOrder: NewOrderReducer,
  MyOrders: GetOrderReducer,
  SingleOrder:GetSingleOrder,

})




let initialState = {
  Cart: {
    CartItems: localStorage.getItem('CartItems') ?
      JSON.parse(localStorage.getItem('CartItems'))
      : [],
    ShippingInfo: localStorage.getItem('ShippingInfo') ?
      JSON.parse(localStorage.getItem('ShippingInfo'))
      : {}
  },
  // MyOrders:{
  //   Orders:[]
  // }

}

const middleware = [thunk]


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)))


export default store