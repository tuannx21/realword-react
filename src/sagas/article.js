import { Article } from './api'
import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAIL, GET_PROFILE_SUCCESS, FETCH_ARTICLE_SUCCESS, FETCH_TAGS_FAIL, FETCH_ARTICLES_START, FETCH_ARTICLE_START, FAVORITE_ARTICLE_SUCCESS, FAVORITE_ARTICLE_START, UNFAVORITE_ARTICLE_START, CREATE_ARTICLE_FAIL, CREATE_ARTICLE_START, DELETE_ARTICLE_FAIL, DELETE_ARTICLE_START, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_START, FETCH_ARTICLES_FEED_SUCCESS, FETCH_ARTICLES_FEED_FAIL, FETCH_ARTICLES_FEED_START } from '../store/constant'
import { push } from 'connected-react-router'


function* fetchArticles(action) {
  try {
    const data = yield Article.findAll(action.params)

    yield put({ type: FETCH_ARTICLES_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_ARTICLES_FAIL, error })
  }
}

function* fetchArticlesFeed() {
  try {
    const data = yield Article.findAllFeed()

    yield put({ type: FETCH_ARTICLES_FEED_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_ARTICLES_FEED_FAIL, error })
  }
}

function* fetchArticle(action) {
  try {
    const data = yield Article.findBySlug(action.slug)
    const author = data.article.author

    yield put({ type: GET_PROFILE_SUCCESS, data: { profile: author } })
    yield put({ type: FETCH_ARTICLE_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_TAGS_FAIL, error })
  }
}

function* favoriteArticle(action) {
  try {
    const data = yield Article.favorite(action.slug)
    const author = data.article.author

    yield put({ type: GET_PROFILE_SUCCESS, data: { profile: author } })
    yield put({ type: FAVORITE_ARTICLE_SUCCESS, data })
  } catch (error) {
    yield put(push('/login'))
  }
}

function* unfavoriteArticle(action) {
  try {
    const data = yield Article.unfavorite(action.slug)
    const author = data.article.author

    yield put({ type: GET_PROFILE_SUCCESS, data: { profile: author } })
    yield put({ type: FAVORITE_ARTICLE_SUCCESS, data })
  } catch (error) {
    yield put(push('/login'))
  }
}

function* createArticle(action) {
  try {
    const data = yield Article.create(action.article)

    yield put(push(`/article/${data.article.slug}`))
  } catch (error) {
    yield put({ type: CREATE_ARTICLE_FAIL, error: error.response.data.errors })
  }
}

function* updateArticle(action) {
  try {
    const data = yield Article.update(action.articleSlug, action.article)

    yield put(push(`/article/${data.article.slug}`))
  } catch (error) {
    yield put({ type: UPDATE_ARTICLE_FAIL, error: error.response.data.errors })
  }
}

function* deleteArticle(action) {
  try {
    yield Article.delete(action.slug)

    yield put(push(`/`))
  } catch (error) {
    yield put({ type: DELETE_ARTICLE_FAIL, error: error.response.data.errors })
  }
}


export default function* articleWatcher() {
  yield takeLatest(FETCH_ARTICLES_START, fetchArticles)
  yield takeLatest(FETCH_ARTICLES_FEED_START, fetchArticlesFeed)
  yield takeLatest(FETCH_ARTICLE_START, fetchArticle)
  yield takeLatest(FAVORITE_ARTICLE_START, favoriteArticle)
  yield takeLatest(UNFAVORITE_ARTICLE_START, unfavoriteArticle)
  yield takeLatest(CREATE_ARTICLE_START, createArticle)
  yield takeLatest(DELETE_ARTICLE_START, deleteArticle)
  yield takeLatest(UPDATE_ARTICLE_START, updateArticle)

}