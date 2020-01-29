import { put, takeLatest } from 'redux-saga/effects'
import { CLEAR_PROFILE, CLEAR_ARTICLE, ARTICLE_PAGE_UNLOAD } from '../store/constant'

function* onUnloadSArticlePage() {
  yield put({ type: CLEAR_PROFILE })
  yield put({ type: CLEAR_ARTICLE })
}

export default function* pagesWatcher() {
  yield takeLatest(ARTICLE_PAGE_UNLOAD, onUnloadSArticlePage)
}