import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productDetails, productsReducer } from './Components/Reducers/ProductReducers'

import { ChangePassReducer, ForgotPassReducer, UserLoginReducer, UserProfileUpdateReducer } from './Components/Reducers/UserReducers'

import { AddToCartReducer } from './Components/Reducers/CartReducers'




const reducer = combineReducers({
  productsReducer,
  productDetails,
  UserLoginReducer,
  UpdateProfile: UserProfileUpdateReducer,
  ChangePassReducer,
  ForgotPassReducer,
  Cart: AddToCartReducer
})




let initialState = {
  Cart: {
    CartItems: localStorage.getItem('CartItems') ? 
    JSON.parse(localStorage.getItem('CartItems')) 
    : []
  }
}

const middleware = [thunk]


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)))


export default store