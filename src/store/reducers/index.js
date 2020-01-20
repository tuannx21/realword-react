import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import articles from './articles'
import article from './article'
import tags from './tags'
import auth from './auth'
import user from './user'

export default history => combineReducers({
  router: connectRouter(history),
  articles,
  article,
  tags,
  auth,
  user
})