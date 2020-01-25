import { put, takeLatest } from 'redux-saga/effects'
import { Tag } from './api'
import { FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL, FETCH_TAGS_START } from '../store/constant'

function* fetchTags() {
  try {
    const data = yield Tag.findAll()

    yield put({ type: FETCH_TAGS_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_TAGS_FAIL, error })
  }
}

export default function* tagWatcher() {
  yield takeLatest(FETCH_TAGS_START, fetchTags)
}