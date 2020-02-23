import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CREATE_COMMENT_START } from '../store/constant'

const CommentInput = props => {
  const { article } = props
  const [comment, setComment] = useState({body: ''})

  const currentUser = useSelector(state => state.auth.currentUser)

  const dispatch = useDispatch()
  const createComment = (slug, comment) => dispatch({ type: CREATE_COMMENT_START, slug, comment })

  const onCommentInputChange = event => {
    setComment({ body: event.target.value })
  }

  const handleCreateComment = () => {
    createComment(article.slug, comment)
    setComment({ body: '' })
  }

  const onSubmitComment = event => {
    event.preventDefault()
    handleCreateComment()
  }

  const onEnterInput = event => {
    if (event.keyCode !== 13 || event.shiftKey === true) return null
    handleCreateComment()
  }

  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Write a comment..."
          rows="3"
          value={comment.body}
          onChange={onCommentInputChange}
          onKeyUp={onEnterInput}></textarea>
      </div>
      <div className="card-footer">
        <img src={currentUser.image} className="comment-author-img" alt="img" />
        <button className="btn btn-sm btn-primary" onClick={onSubmitComment}>Post Comment</button>
      </div>
    </form>
  )
}

export default CommentInput