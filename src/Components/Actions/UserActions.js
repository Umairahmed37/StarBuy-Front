import axios from "axios"
import { useAlert } from "react-alert"


export const LoginAction = (email, password) => async (dispatch) => {
  
  try {
    
    dispatch({ type: "USER_LOGIN_ATTEMPT" })

    const { data } = await axios.post("/api/v1/login", { email, password })

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data.user
    })

  } catch (error) {
     dispatch({
      type: "USER_LOGIN_FAILED",
      payload: error
    })
  }

  // dispatch({
  //   type: "CLEAR_ERROR"
    
  // })

}


export const RegisterAction = (UserData) => async (dispatch) => {

  try {
    dispatch({ type: "USER_REGISTER_ATTEMPT" })
    const User = await axios.post('/api/v1/register', UserData)
    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: User
    })

  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILED",
      payload: error
    })
  }
}


export const loadUser = () => async (dispatch) => {

  try {
    dispatch({ type: "USER_LOAD_ATTEMPT" })
    let User = await axios.get('/api/v1/me')
    User = User.data.user
     dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: User
    })

  } catch (error) {
    dispatch({
      type: "USER_LOAD_FAILED",
      payload: error
    })
  }
}

export const Logout = () => async (dispatch) => {

  try {
    const User = await axios.get('/api/v1/logout')
    dispatch({
      type: "USER_LOGGEDOUT_SUCCESS",
      payload: User
    })

  } catch (error) {
    dispatch({
      type: "USER_LOGGEDOUT_FAILED",
      payload: error
    })
  }
}


export const ProfileUpdate = (Updated) => async (dispatch) => {

  try {
    dispatch({ type: "USER_UPDATE_ATTEMPT" })
    const User = await axios.put('/api/v1/me/update', Updated)
     dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: User.data.success
    })

  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAILED",
      payload: error
    })
  }
}

export const ChangePassword = (passwords) => async (dispatch) => {

  try {
    dispatch({ type: "CHANGE_PASS_ATTEMPT" })
    let message = await axios.put('/api/v1/password/update',passwords)
     dispatch({
      type: "CHANGE_PASS_SUCCESS",
      payload: message
    })

  } catch (error) {
    dispatch({
      type: "CHANGE_PASS_FAILED",
      payload: error
    })
  }
}

export const ForgotPasswordAction = (email) => async (dispatch) => {

  try {
    dispatch({ type: "FORGOT_PASS_ATTEMPT" })
    let message = await axios.post('/api/v1/password/forgot',email)
     dispatch({
      type: "FORGOT_PASS_SUCCESS",
      payload: message
    })

  } catch (error) {
    dispatch({
      type: "FORGOT_PASS_FAILED",
      payload: error
    })
  }
}

export const ResetPassword = (passwords) => async (dispatch) => {

  try {
    dispatch({ type: "RESET_PASS_ATTEMPT" })
    let message = await axios.post('/api/v1/password/forgot',passwords)
     dispatch({
      type: "RESET_PASS_SUCCESS",
      payload: message.success
    })

  } catch (error) {
    dispatch({
      type: "RESET_PASS_FAILED",
      payload: error
    })
  }
}

export const NewPassword = (token, passwords) => async (dispatch) => {
  
  try {
    
    dispatch({ type: "NEW_PASSWORD_ATTEMPT" })

    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords)

    dispatch({
      type: "NEW_PASSWORD_SUCCESS",
      payload: data.success
    })

  } catch (error) {
     dispatch({
      type: "NEW_PASSWORD_FAILED",
      payload: error
    })
  }
}

















export const clearError = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}