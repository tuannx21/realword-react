import React from 'react'
import { formatDate } from '../helpers/utils'
import { Link } from 'react-router-dom'
import { DELETE_COMMENT_START } from '../store/constant'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  article: state.article.article
})

const mapDispatchToProps = dispatch => ({
  deleteComment: (slug, id) => dispatch({ type: DELETE_COMMENT_START, slug, id })
})

function CommentItem(props) {
  const { comment, article, currentUser, deleteComment } = props

  const canDelete = currentUser.username === comment.author.username 
  ? <span className="mod-options"><i className="ion-trash-a" onClick={() => deleteComment(article.slug, comment.id)}></i></span>
  : <span></span>

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
        {canDelete}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)