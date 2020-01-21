import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import createRootReducer from './reducers'

export const history = createBrowserHistory()

export default () => {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware),
      reduxDevTools
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}