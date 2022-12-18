

export const UserLoginReducer = (state = { User: {} }, action) => {

  switch (action.type) {
    case "USER_LOGIN_ATTEMPT": /////////login attempt
    case "USER_LOAD_ATTEMPT":
    case "USER_REGISTER_ATTEMPT":
      return {
        ...state,
        LogginError: false,
        isAuthenticated: false,
        loading: true,
      }
    case "USER_LOGIN_SUCCESS": /////////login success
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        User: action.payload
      }
    case "USER_LOGIN_FAILED": /////////login failed
    case "USER_REGISTER_FAILED":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        LogginError: true,
        User: null,
      }
    case "USER_LOGGEDOUT_SUCCESS":
      return {
        loading: false,
        User: null,

      }
    case "USER_LOGGEDOUT_FAILED":
    case "USER_LOAD_FAILED":
      return {
        ...state,
        // error: action.payload,
        loading: false,
      }

    case "USER_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        User: action.payload,
      }

    case "CLEAR_ERROR":   /////////error clear
      return {
        error: null,
        loading: false,
        LogginError: false,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

// export const UserRegisterReducer = (state = { User: {} }, action) => {

//   switch (action.type) {
//     case "USER_REGISTER_ATTEMPT":
//       return {
//         ...state,
//         loading: true,
//         isAuthenticated: false,
//       }
//     case "USER_REGISTER_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         User: action.payload
//       }
//     case "USER_REGISTER_FAILED":

//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: false,
//         error: action.payload,
//         User: null,
//       }
//     case "CLEAR_ERROR":
//       return {
//         ...state,
//         error: null
//       }
//     default:
//       return state
//   }
// }


export const UserProfileUpdateReducer = (state = {}, action) => {

  switch (action.type) {
    case "USER_UPDATE_ATTEMPT":
      return {
        ...state,
        loading: true,
        isUpdated: false,
      }
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case "USER_UPDATE_FAILED":

      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case "USER_UPDATE_RESET":

      return {
        ...state,
        isUpdated: false,
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


export const ChangePassReducer = (state = {}, action) => {

  switch (action.type) {
    case "CHANGE_PASS_ATTEMPT":
      return {
        ...state,
        loading: true,
        isUpdated: false,
        ChangePassError: false,
      }
    case "CHANGE_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: true,
        Message: action.payload
      }
    case "CHANGE_PASS_FAILED":

      return {
        ...state,
        loading: false,
        error: action.payload,
        ChangePassError: true
      }
    case "CHANGE_PASS_RESET":

      return {
        ...state,
        loading: false,
        isUpdated: false,

      }

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        ChangePassError: ""

      }
    default:
      return state
  }
}

export const ForgotPassReducer = (state = {}, action) => {

  switch (action.type) {
    case "FORGOT_PASS_ATTEMPT":
    case "NEW_PASSWORD_ATTEMPT":
      return {
        ...state,
        loading: true,
        updated:false,

      }
    case "FORGOT_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        Message: action.payload
      }
    case "NEW_PASSWORD_SUCCESS":
      return {
        ...state,
        Message: action.payload,
        loading: false,
        updated:true,

      }
    case "FORGOT_PASS_FAILED":
    case "NEW_PASSWORD_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,

      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}