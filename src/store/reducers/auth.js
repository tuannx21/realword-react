import * as types from '../constant'
import { bindActionCreators } from 'redux'

const initialState = {
  errorsLogin: {},
  errorsRegister: {},
  errors: {},
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return { ...state, currentUser: action.data.user }
    case types.LOGIN_FAIL:
      return { ...state, errors: action.error }
    case types.REGISTER_FAIL:
      return { ...state, errors: action.error }
    case types.LOGOUT_SUCCESS:
      return { ...state, currentUser: {} }
    case types.LOGIN_START:
    case types.LOGOUT_START:
    case types.REGISTER_START:
    default:
      return state
  }
}