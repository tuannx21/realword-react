import * as types from '../constant'

const initialState = {
  isLoading: false,
  article: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLE_START:
      return { ...state, isLoading: true }
    case types.FETCH_ARTICLE_SUCCESS:
      return { ...state, article: action.data.article, isLoading: false }
    case types.FETCH_ARTICLE_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}