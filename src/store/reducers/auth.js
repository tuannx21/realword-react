import * as types from '../constant'

const initialState = {
  errors: {},
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return state
    case types.LOGIN_SUCCESS:
    case types.FETCH_CURRENT_USER:
      return { ...state, currentUser: action.data.user }
    case types.LOGIN_FAIL:
      return { ...state, errors: action.error }
    case types.LOGOUT_SUCCESS:
      return { ...state, currentUser: {} }
    default:
      return state
  }
}