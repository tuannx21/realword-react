import { all } from 'redux-saga/effects'
import articleWatcher from './article'
import tagWatcher from './tag'
import authWatcher from './auth'
import user from './user'

export default function* rootSaga() {
  yield all([
    articleWatcher(),
    tagWatcher(),
    authWatcher(),
    user()
  ])
}