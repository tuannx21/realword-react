import React, { Component } from 'react'
import { CREATE_ARTICLE_START } from '../store/constant'
import { connect } from 'react-redux'
import { displayErrors } from '../helpers/utils'

const mapStateToProps = state => ({
  errors: state.article.createErrors
})

const mapDispatchToProps = dispatch => ({
  createArticle: article => dispatch({ type: CREATE_ARTICLE_START, article })
})

class EditArticlePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  }

  onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    this.setState({
      article: {
        ...this.state.article,
        [targetName]: targetValue
      }
    })
  }

  onHandleSubmit = event => {
    event.preventDefault()
    this.setState({
      article: {
        title: '',
        description: '',
        body: '',
      }
    })
    this.props.createArticle(this.state.article)
  }

  render() {
    const { errors } = this.props

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ul className="error-messages">
                {displayErrors(errors)}
              </ul>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      name="title"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      name="description"
                      className="form-control"
                      placeholder="What's this article about?"
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control"
                      name="body"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      onChange={this.onInputChange}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      className="form-control"
                      placeholder="Enter tags" />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={this.onHandleSubmit}>
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage)