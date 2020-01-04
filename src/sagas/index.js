import axios from 'axios'
import { put, takeLatest, all, call } from 'redux-saga/effects'
import * as types from '../store/constant'

function fetchArticles() {
  return axios.get('https://conduit.productionready.io/api/articles')
}

function* workerArticles() {
  try {
    const response = yield call(fetchArticles)
    const data = response.data

    yield put({ type: types.FETCH_ARTICLES_SUCCESS, data })
  }
  catch (error) {
    yield put({ type: types.FETCH_ARTICLES_FAIL, error })
  }
}

function* actionWatcher() {
  yield takeLatest(types.FETCH_ARTICLES_PENDING, workerArticles)
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ])
}