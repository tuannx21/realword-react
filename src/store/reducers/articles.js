import { FETCH_ARTICLES_START, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAIL, FAVORITE_ARTICLE_SUCCESS, UNFAVORITE_ARTICLE_SUCCESS, FETCH_ARTICLES_FEED_SUCCESS, FETCH_ARTICLES_FEED_FAIL, FETCH_ARTICLES_FEED_START } from "../constant"

const initialState = {
  isLoading: false,
  error: null,
  articles: [],
  articlesCount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_START:
    case FETCH_ARTICLES_FEED_START:
      return { ...state, isLoading: true }
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_FEED_SUCCESS:
      return { ...state, articles: action.data.articles, articlesCount: action.data.articlesCount ,isLoading: false }
    case FETCH_ARTICLES_FAIL:
    case FETCH_ARTICLES_FEED_FAIL:
      return { ...state, isLoading: false, error: action.error }
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: state.articles.map(article => article.slug === action.data.article.slug ? action.data.article : article)
      }
    default:
      return state
  }
}