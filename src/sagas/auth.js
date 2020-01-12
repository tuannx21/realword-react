import { put, takeLatest } from 'redux-saga/effects'
import * as types from '../store/constant'
import { push } from 'connected-react-router'
import { Auth, User, setToken } from './api'

function* login(action) {
  try {
    const data = yield Auth.login(action.user)

    yield put({ type: types.LOGIN_SUCCESS, data })
    yield setToken(data.user.token)
    yield localStorage.setItem('token', data.user.token)
    yield put(push('/'))
  } catch (error) {
    yield put({ type: types.LOGIN_FAIL, error: error.response.data.errors })
    yield put(push('/login'))
  }
}

function* logout() {
  yield localStorage.removeItem('token')
  yield setToken('')
  yield put({ type: types.LOGOUT_SUCCESS })
}

function* fetchCurrentUser() {
  try {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) return

    yield setToken(storedToken)
    const data = yield User.getCurrent()
    yield put({ type: types.LOGIN_SUCCESS, data })
  } catch (error) {
    throw new Error(error)
  }
}

export default function* authWatcher() {
  yield takeLatest(types.LOGIN_START, login)
  yield takeLatest(types.LOGOUT_START, logout)
  yield takeLatest(types.FETCH_CURRENT_USER, fetchCurrentUser)
}