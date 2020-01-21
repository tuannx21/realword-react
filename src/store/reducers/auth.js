import * as types from '../constant'

const initialState = {
  errorsLogin: {},
  errorsRegister: {},
  errorsUpdateProfile: {},
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, currentUser: action.data.user }
    case types.LOGIN_FAIL:
      return { ...state, errorsLogin: action.error }
    case types.REGISTER_FAIL:
      return { ...state, errorsRegister: action.error }
    case types.UPDATE_PROFILE_FAIL:
      return { ...state, errorsUpdateProfile: action.error }
    case types.LOGOUT_SUCCESS:
      return { ...state, currentUser: {} }
    case types.CLEAR_ALL_AUTH_ERRORS:
      return { ...state, errorsLogin: {}, errorsRegister: {} }
    default:
      return state
  }
}