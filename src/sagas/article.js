import { Article } from './api'
import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import * as types from '../store/constant'


function* fetchArticles() {
  try {
    const data = yield Article.findAll()

    yield put({ type: types.FETCH_ARTICLES_SUCCESS, data })
  } catch (error) {
    yield put({ type: types.FETCH_ARTICLES_FAIL, error })
  }
}

function* fetchArticle(action) {
  try {
    const data = yield Article.findBySlug(action.slug)

    yield put({ type: types.FETCH_ARTICLE_SUCCESS, data })
  } catch (error) {
    yield put({ type: types.FETCH_TAGS_FAIL, error })
  }
}


export default function* articleWatcher() {
  yield takeLatest(types.FETCH_ARTICLES_START, fetchArticles)
  yield takeEvery(types.FETCH_ARTICLE_START, fetchArticle)
}