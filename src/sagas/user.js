import { User } from './api'
import { put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_START, FOLLOW_PROFILE_SUCCESS, FOLLOW_PROFILE_FAIL, UNFOLLOW_PROFILE_SUCCESS, UNFOLLOW_PROFILE_FAIL, UNFOLLOW_PROFILE_START, FOLLOW_PROFILE_START } from '../store/constant'


function* updateUser(action) {
  try {
    const data = yield User.update(action.user)

    yield put({ type: UPDATE_PROFILE_SUCCESS, data })
    yield put(push(`/user/@${data.user.username}`))
  } catch (error) {
    yield put({ type: UPDATE_PROFILE_FAIL, error: error.response.data.errors })
  }
}

function* getProfile(action) {
  try {
    const data = yield User.getProfile(action.username)

    yield put({ type: GET_PROFILE_SUCCESS, data })
  } catch (error) {
    yield put({ type: GET_PROFILE_FAIL, error: error.response.data.errors })
  }
}

function* followProfile(action) {
  try {
    const data = yield User.follow(action.username)

    yield put({ type: FOLLOW_PROFILE_SUCCESS, data })
  } catch (error) {
    if (error.response.status === 401 ) yield put(push('/login'))
    yield put({ type: FOLLOW_PROFILE_FAIL, error: error.response.data.errors })
  }
}

function* unfollowProfile(action) {
  try {
    const data = yield User.unfollow(action.username)

    yield put({ type: UNFOLLOW_PROFILE_SUCCESS, data })
  } catch (error) {
    yield put({ type: UNFOLLOW_PROFILE_FAIL, error: error.response.data.errors })
  }
}

export default function* articleWatcher() {
  yield takeLatest(UPDATE_PROFILE_START, updateUser)
  yield takeLatest(GET_PROFILE_START, getProfile)
  yield takeLatest(FOLLOW_PROFILE_START, followProfile)
  yield takeLatest(UNFOLLOW_PROFILE_START, unfollowProfile)
}