import * as types from '../constant'

const initialState = {
  isLoading: false,
  errors: null,
  currentUser: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return { ...state, isLoading: true }
    case types.LOGIN_SUCCESS:
      return { ...state, currentUser: action.data.user, isLoading: false }
    case types.LOGIN_FAIL:
      return { ...state, isLoading: false, errors: action.error }
    default:
      return state
  }
}