import { Article } from './api'
import { put, takeLatest } from 'redux-saga/effects'
import * as types from '../store/constant'


function* fetchArticles() {
  try {
    const data = yield Article.getAll()

    yield put({ type: types.FETCH_ARTICLES_SUCCESS, data })
  } catch (error) {
    yield put({ type: types.FETCH_ARTICLES_FAIL, error })
  }
}


export default function* articleWatcher() {
  yield takeLatest(types.FETCH_ARTICLES_PENDING, fetchArticles)
}