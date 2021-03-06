import { put, takeLatest } from 'redux-saga/effects'
import { Comment } from './api'
import { FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAIL, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_START, FETCH_COMMENTS_START, DELETE_COMMENT_START, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL } from '../store/constant'

function* fetchComments(action) {
  try {
    const data = yield Comment.findAll(action.slug)

    yield put({ type: FETCH_COMMENTS_SUCCESS, data })
  }
  catch (error) {
    yield put({ type: FETCH_COMMENTS_FAIL, error: error.response.data.errors })
  }
}

function* createComment(action) {
  try {
    const data = yield Comment.create(action.slug, action.comment)

    yield put({ type: CREATE_COMMENT_SUCCESS, data })
  }
  catch (error) {
    yield put({ type: CREATE_COMMENT_FAIL, error: error.response.data.errors })
  }
}

function* deleteComment(action) {
  try {
    const id = yield action.id

    yield Comment.delete(action.slug, id)
    yield put({ type: DELETE_COMMENT_SUCCESS, id })
  }
  catch (error) {
    yield put({ type: DELETE_COMMENT_FAIL, error: error.response.data.errors })
  }
}

export default function* commentWatcher() {
  yield takeLatest(FETCH_COMMENTS_START, fetchComments)
  yield takeLatest(CREATE_COMMENT_START, createComment)
  yield takeLatest(DELETE_COMMENT_START, deleteComment)

}