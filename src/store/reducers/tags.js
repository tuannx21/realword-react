import { FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL } from "../constant"

const initialState = {
  isLoading: false,
  tags: [],
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS_START:
      return { ...state, isLoading: true }
    case FETCH_TAGS_SUCCESS:
      return { ...state, isLoading: false, tags: action.data.tags }
    case FETCH_TAGS_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}