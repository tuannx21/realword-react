import { put, takeLatest, all } from 'redux-saga/effects'
import * as types from '../store/constant'

function* fetchArticles() {
  const data = yield fetch('https://conduit.productionready.io/api/articles').then(response => response.json())

  yield put({ type: types.FETCH_ARTICLES_SUCCESS, data })
}

function* actionWatcher() {
  yield takeLatest(types.FETCH_ARTICLES_PENDING, fetchArticles)
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ])
}