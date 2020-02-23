import React, { Component } from 'react'
import { CREATE_ARTICLE_START, FETCH_ARTICLE_START, CLEAR_ARTICLE, UPDATE_ARTICLE_START } from '../store/constant'
import { connect } from 'react-redux'
import ErrorList from '../component/ErrorList'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  article: state.article.article,
  errors: state.article.createErrors
})

const mapDispatchToProps = dispatch => ({
  fetchArticle: slug => dispatch({ type: FETCH_ARTICLE_START, slug }),
  createArticle: article => dispatch({ type: CREATE_ARTICLE_START, article }),
  updateArticle: (articleSlug, article) => dispatch({ type: UPDATE_ARTICLE_START, articleSlug, article }),
  onUnload: () => dispatch({ type: CLEAR_ARTICLE })
})

class EditArticlePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagInput: '',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
    this.canUpdate = null
  }

  componentDidMount() {
    const { match, fetchArticle } = this.props
    if (match.params.articleSlug) fetchArticle(match.params.articleSlug)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.match.params.articleSlug) return null

    if (props.article.slug
      && props.currentUser.username === props.article.author.username
      && !state.article.title) {
      const { title, description, body, tagList } = props.article
      return {
        article: {
          title,
          description,
          body,
          tagList
        }
      }
    }

    return null
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

  onInputTagChange = event => {
    this.setState({ tagInput: event.target.value })
  }

  onKeyUpTagInput = event => {
    const { article, tagInput } = this.state

    if (event.keyCode !== 13) return null
    if (article.tagList.includes(tagInput)) return this.setState({ tagInput: '' })

    this.setState({
      article: {
        ...article,
        tagList: [
          ...article.tagList,
          tagInput
        ]
      },
      tagInput: ''
    })
  }

  onClickRemoveTag = targetTag => {
    const { article } = this.state
    this.setState({
      article: {
        ...article,
        tagList: [
          ...article.tagList.filter(tag => tag !== targetTag)
        ]
      }
    })
  }

  onHandleSubmit = event => {
    event.preventDefault()
    const { createArticle, updateArticle, match } = this.props
    const { article } = this.state

    this.setState({
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    })

    if (match.params.articleSlug) updateArticle(match.params.articleSlug, article)
    else createArticle(article)
  }

  render() {
    const { errors } = this.props
    const { tagInput, article } = this.state

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ErrorList errors={errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      name="title"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={article.title}
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      name="description"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={article.description}
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control"
                      name="body"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={article.body}
                      onChange={this.onInputChange}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={this.onInputTagChange}
                      onKeyDown={this.onKeyUpTagInput} />
                    <div className="tag-list">
                      {article.tagList.map(tag => (
                        <span key={tag} className="tag-default tag-pill ng-binding ng-scope">
                          <i className="ion-close-round" onClick={() => this.onClickRemoveTag(tag)} />{tag}
                        </span>
                      ))}
                    </div>
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