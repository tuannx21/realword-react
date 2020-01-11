import { put, takeLatest } from 'redux-saga/effects'
import * as types from '../store/constant'
import { Auth, setToken } from './api'

function* login(action) {
  try {
    const data = yield Auth.login(action.user)

    yield put({ type: types.LOGIN_SUCCESS, data })
    yield setToken(data.user.token)
  } catch (error) {
    yield put({ type: types.LOGIN_FAIL, error })
  }
}

export default function* authWatcher() {
  yield takeLatest(types.LOGIN_START, login)
}