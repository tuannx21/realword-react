import { put, takeLatest } from 'redux-saga/effects'
import * as types from '../store/constant'
import { Tag } from './api'

function* fetchTags() {
  try {
    const data = yield Tag.findAll()

    yield put({ type: types.FETCH_TAGS_SUCCESS, data })
  } catch (error) {
    yield put({ type: types.FETCH_TAGS_FAIL, error })
  }
}

export default function* tagWatcher() {
  yield takeLatest(types.FETCH_TAGS_START, fetchTags)
}