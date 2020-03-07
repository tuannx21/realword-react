import React, { useState, useEffect, useCallback } from 'react'
import { CREATE_ARTICLE_START, FETCH_ARTICLE_START, CLEAR_ARTICLE, UPDATE_ARTICLE_START } from '../store/constant'
import { useSelector, useDispatch } from 'react-redux'
import ErrorList from '../component/ErrorList'

const EditArticlePage = props => {
  const { match } = props

  const [tagInput, setTagInput] = useState('')
  const [article, setArticle] = useState({ title: '', description: '', body: '', tagList: [] })

  const currentUser = useSelector(state => state.auth.currentUser)
  const errors = useSelector(state => state.article.errorCreate)

  const dispatch = useDispatch()
  const fetchArticle = useCallback(slug => dispatch({ type: FETCH_ARTICLE_START, slug }), [dispatch])
  const createArticle = article => dispatch({ type: CREATE_ARTICLE_START, article })
  const updateArticle = (articleSlug, article) => dispatch({ type: UPDATE_ARTICLE_START, articleSlug, article })
  const onPageUnload = useCallback(() => dispatch({ type: CLEAR_ARTICLE }), [dispatch])

  useEffect(() => {
    if (match.params.articleSlug) fetchArticle(match.params.articleSlug)

    return onPageUnload
  }, [fetchArticle, onPageUnload, match.params.articleSlug])

  useEffect(() => {
    if (props.article.slug
      && currentUser.username === props.article.author.username) {
      const { title, description, body, tagList } = props.article
      setArticle({
        title,
        description,
        body,
        tagList
      })
    }
    else setArticle({
      title: '',
      description: '',
      body: '',
      tagList: []
    })
  }, [props.article, currentUser.username])

  const onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    setArticle({
      ...article,
      [targetName]: targetValue
    })
  }

  const onInputTagChange = event => {
    setTagInput(event.target.value)
  }

  const onKeyUpTagInput = event => {
    if (event.keyCode !== 13) return null
    if (article.tagList.includes(tagInput)) return setTagInput('')

    setArticle({
      ...article,
      tagList: [
        ...article.tagList,
        tagInput
      ]
    })
    setTagInput('')
  }

  const onClickRemoveTag = targetTag => {
    setArticle({
      ...article,
      tagList: [
        ...article.tagList.filter(tag => tag !== targetTag)
      ]
    })
  }

  const onHandleSubmit = event => {
    event.preventDefault()
    setArticle({
      title: '',
      description: '',
      body: '',
      tagList: []
    })
    if (match.params.articleSlug) updateArticle(match.params.articleSlug, article)
    else createArticle(article)
  }

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
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text"
                    name="description"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={article.description}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control"
                    name="body"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={article.body}
                    onChange={onInputChange}></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={onInputTagChange}
                    onKeyDown={onKeyUpTagInput} />
                  <div className="tag-list">
                    {article.tagList.map(tag => (
                      <span key={tag} className="tag-default tag-pill ng-binding ng-scope">
                        <i className="ion-close-round" onClick={() => onClickRemoveTag(tag)} />{tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={onHandleSubmit}>
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

export default EditArticlePage