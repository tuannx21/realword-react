import { all } from 'redux-saga/effects'
import articleWatcher from './article'
import tagWatcher from './tag'
import authWatcher from './auth'
import userWatcher from './user'
import pageWatcher from './pages'

export default function* rootSaga() {
  yield all([
    articleWatcher(),
    tagWatcher(),
    authWatcher(),
    userWatcher(),
    pageWatcher()
  ])
}