import { FETCH_COMMENTS_START, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAIL, CREATE_ARTICLE_START, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, CLEAR_COMMENTS } from "../constant"

const initialState = {
  isLoading: false,
  comments: [],
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
      return { ...state, isLoading: true }
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.data.comments }
    case FETCH_COMMENTS_FAIL:
      return { ...state, isLoading: false, error: action.error }
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state, comments: [
          action.data.comment,
          ...state.comments
        ]
      }
    case DELETE_COMMENT_SUCCESS:
      return { ...state, comments: state.comments.filter(comment => comment.id !== action.id) }
    case CLEAR_COMMENTS: 
      return { ...state, comments: []}
    case CREATE_ARTICLE_START:
    default:
      return state
  }
}