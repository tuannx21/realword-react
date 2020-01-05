import React from 'react'
import CommentItem from './CommentItem'

function Commentlist(props) {
  const { comments } = props

  return (
    <div className="comment-list">
      {/* {
        comments.map(comment => (
          <CommentItem />
        ))
      } */}
      <CommentItem />
      <CommentItem />
    </div>
  )
}

export default Commentlist