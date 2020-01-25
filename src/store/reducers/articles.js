import { FETCH_ARTICLES_START, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAIL, FAVORITE_ARTICLE_SUCCESS, UNFAVORITE_ARTICLE_SUCCESS } from "../constant"

const initialState = {
  isLoading: false,
  error: null,
  articles: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_START:
      return { ...state, isLoading: true }
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.data.articles, isLoading: false }
    case FETCH_ARTICLES_FAIL:
      return { ...state, isLoading: false, error: action.error }
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS:
      return { ...state, articles: state.articles.map(article => {
        if (article.slug === action.data.article.slug) {
          return {
            ...article,
            favorited: action.data.article.favorited,
            favoritesCount: action.data.article.favoritesCount
          }
        }
        return article
      })}
    default:
      return state
  }
}