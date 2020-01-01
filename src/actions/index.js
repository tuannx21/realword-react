import { FETCH_ARTICLES } from '../store/constant'

export const fetchArticles = articles => ({ type: FETCH_ARTICLES, articles })