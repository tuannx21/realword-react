import * as types from '../constant'

const initialState = {
  isProcessing: false,
  errors: null,
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return { ...state, isProcessing: true }
    case types.LOGIN_SUCCESS:
      return { ...state, currentUser: action.data.user, isProcessing: false }
    case types.LOGIN_FAIL:
      return { ...state, isProcessing: false, errors: action.error }
    default:
      return state
  }
}