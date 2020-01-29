import { FETCH_ARTICLE_START, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAIL, FAVORITE_ARTICLE_START, UNFAVORITE_ARTICLE_START, FAVORITE_ARTICLE_SUCCESS, UNFAVORITE_ARTICLE_SUCCESS, CREATE_ARTICLE_START, DELETE_ARTICLE_START, CREATE_ARTICLE_FAIL, CLEAR_ARTICLE, UPDATE_ARTICLE_FAIL } from "../constant"

const initialState = {
  isLoading: false,
  article: {},
  error: {},
  createErrors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_START:
      return { ...state, isLoading: true }
    case FETCH_ARTICLE_SUCCESS:
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS:
      return { ...state, article: action.data.article, isLoading: false }
    case FETCH_ARTICLE_FAIL:
      return { ...state, isLoading: false, error: action.error }
    case CREATE_ARTICLE_FAIL:
    case UPDATE_ARTICLE_FAIL:
      return { ...state, createErrors: action.error }
    case CLEAR_ARTICLE:
      return { ...state, article: {} }
    case FAVORITE_ARTICLE_START:
    case UNFAVORITE_ARTICLE_START:
    case CREATE_ARTICLE_START:
    case DELETE_ARTICLE_START:
    default:
      return state
  }
}