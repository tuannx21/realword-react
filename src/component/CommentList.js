import React from 'react'
import CommentItem from './CommentItem'

const Commentlist = ({ comments }) => (
  <div className="comment-list">
    {comments.map(comment => (
      <CommentItem key={comment.id} comment={comment} />
    ))}
  </div>
)

export default Commentlist