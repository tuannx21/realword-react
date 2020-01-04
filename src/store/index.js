import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from './reducers'

export default () => {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
  )

  sagaMiddleware.run(rootSaga)

  return store
}