import * as types from '../constant'

const initialState = {
  isLoading: false,
  error: null,
  articles: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES_START:
      return { ...state, isLoading: true }
    case types.FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.data.articles, isLoading: false }
    case types.FETCH_ARTICLES_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}