import { combineReducers } from 'redux'
import articles from './articles'
import article from './article'
import tags from './tags'

export default combineReducers({
  articles,
  article,
  tags
})