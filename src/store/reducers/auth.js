import { LOGIN_SUCCESS, REGISTER_SUCCESS, UPDATE_PROFILE_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, UPDATE_PROFILE_FAIL, LOGOUT_SUCCESS, CLEAR_ALL_AUTH_ERRORS } from "../constant"

const initialState = {
  errorsLogin: {},
  errorsRegister: {},
  errorsUpdateProfile: {},
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, currentUser: action.data.user }
    case LOGIN_FAIL:
      return { ...state, errorsLogin: action.error }
    case REGISTER_FAIL:
      return { ...state, errorsRegister: action.error }
    case UPDATE_PROFILE_FAIL:
      return { ...state, errorsUpdateProfile: action.error }
    case LOGOUT_SUCCESS:
      return { ...state, currentUser: {} }
    case CLEAR_ALL_AUTH_ERRORS:
      return { ...state, errorsLogin: {}, errorsRegister: {}, errorsUpdateProfile: {} }
    default:
      return state
  }
}