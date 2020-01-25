import { put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { Auth, User, setToken } from './api'
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGIN_START, LOGOUT_START, FETCH_CURRENT_USER, REGISTER_START } from '../store/constant'

function* login(action) {
  try {
    const data = yield Auth.login(action.user)

    yield put({ type: LOGIN_SUCCESS, data })
    yield setToken(data.user.token)
    yield localStorage.setItem('token', data.user.token)
    yield put(push('/'))
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error: error.response.data.errors })
    yield put(push('/login'))
  }
}

function* register(action) {
  try {
    const data = yield Auth.register(action.user)

    yield put({ type: REGISTER_SUCCESS, data })
    yield setToken(data.user.token)
    yield localStorage.setItem('token', data.user.token)
    yield put(push('/'))
  } catch (error) {
    yield put({ type: REGISTER_FAIL, error: error.response.data.errors })
    yield put(push('/signup'))
  }
}

function* logout() {
  yield localStorage.removeItem('token')
  yield setToken('')
  yield put({ type: LOGOUT_SUCCESS })
}

function* fetchCurrentUser() {
  try {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) return

    yield setToken(storedToken)
    const data = yield User.getCurrent()
    yield put({ type: LOGIN_SUCCESS, data })
  } catch (error) {
    throw new Error(error)
  }
}

export default function* authWatcher() {
  yield takeLatest(LOGIN_START, login)
  yield takeLatest(LOGOUT_START, logout)
  yield takeLatest(FETCH_CURRENT_USER, fetchCurrentUser)
  yield takeLatest(REGISTER_START, register)
}