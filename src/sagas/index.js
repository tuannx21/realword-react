import { all } from 'redux-saga/effects'
import articleWatcher from './article'
import tagWatcher from './tag'

export default function* rootSaga() {
  yield all([
    articleWatcher(),
    tagWatcher()
  ])
}