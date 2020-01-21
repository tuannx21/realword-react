import React from 'react'

function CommentInput(props) {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div className="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="img" />
        <button className="btn btn-sm btn-primary">
          Post Comment
            </button>
      </div>
    </form>
  )
}

export default CommentInput