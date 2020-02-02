import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CREATE_COMMENT_START } from '../store/constant'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  createComment: (slug, comment) => dispatch({ type: CREATE_COMMENT_START, slug, comment })
})

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: {
        body: ''
      }
    }
  }

  onCommentInputChange = event => {
    this.setState({
      comment: {
        body: event.target.value
      }
    })
  }

  handleCreateComment = () => {
    const { createComment, article } = this.props

    createComment(article.slug, this.state.comment)
    this.setState({ comment: { body: '' } })
  }

  onSubmitComment = event => {
    event.preventDefault()
    this.handleCreateComment()
  }

  onEnterInput = event => {
    if (event.keyCode !== 13 || event.shiftKey === true) return null
    this.handleCreateComment()
  }

  render() {
    const { currentUser } = this.props
    const { comment } = this.state

    return (
      <form className="card comment-form">
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            rows="3"
            value={comment.body}
            onChange={this.onCommentInputChange}
            onKeyUp={this.onEnterInput}></textarea>
        </div>
        <div className="card-footer">
          <img src={currentUser.image} className="comment-author-img" alt="img" />
          <button className="btn btn-sm btn-primary" onClick={this.onSubmitComment}>Post Comment</button>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput)