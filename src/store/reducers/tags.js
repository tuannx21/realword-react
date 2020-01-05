import * as types from '../constant'

const initialState = {
  isLoading: false,
  tags: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TAGS_START:
      return { ...state, isLoading: true }
    case types.FETCH_TAGS_SUCCESS:
      return { ...state, isLoading: false, tags: action.data.tags }
    case types.FETCH_TAGS_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}