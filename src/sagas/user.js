import { User } from './api'
import { put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_START } from '../store/constant'


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

export default function* articleWatcher() {
  yield takeLatest(UPDATE_PROFILE_START, updateUser)
  yield takeLatest(GET_PROFILE_START, getProfile)

}