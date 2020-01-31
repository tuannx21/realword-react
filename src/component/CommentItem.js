import React from 'react'
import { formatDate } from '../helpers/utils'
import { Link } from 'react-router-dom'

function Comment(props) {
  const { comment } = props

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/user/@${comment.author.username}`} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt="img" />
        </Link>&nbsp;
        <Link to={`/user/@${comment.author.username}`} className="comment-author">{comment.author.username}</Link>
        <span className="date-posted">{formatDate(new Date(comment.createdAt))}</span>
      </div>
    </div>
  )
}

export default Comment