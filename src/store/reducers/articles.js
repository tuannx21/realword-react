import * as types from '../constant'

const initialState = {
  loading: false,
  articles: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES_PENDING:
      return { ...state, loading: true }
    case types.FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.data.articles, loading: false }
    case types.FETCH_ARTICLES_FAIL:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}