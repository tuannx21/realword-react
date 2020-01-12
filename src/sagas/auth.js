import { put, takeLatest } from 'redux-saga/effects'
import * as types from '../store/constant'
import { push } from 'connected-react-router'
import { Auth, setToken } from './api'

function* login(action) {
  try {
    const data = yield Auth.login(action.user)

    yield put({ type: types.LOGIN_SUCCESS, data })
    // yield setToken(data.user.token)
    yield put(push('/'))
  } catch (error) {
    yield put({ type: types.LOGIN_FAIL, error: error.response.data.errors })
  }
}

export default function* authWatcher() {
  yield takeLatest(types.LOGIN_START, login)
}