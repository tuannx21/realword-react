import React from 'react'
import CommentItem from './CommentItem'

function Commentlist(props) {
  const { comments } = props

  return (
    <div className="comment-list">
      {
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}

export default Commentlist