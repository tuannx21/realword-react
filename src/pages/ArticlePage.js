import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticleMeta from '../component/ArticleMeta'
import Banner from '../component/Banner'
import CommentInput from '../component/CommentInput'
import CommentList from '../component/CommentList'
import TagList from '../component/TagList'
import { FETCH_ARTICLE_START, ARTICLE_PAGE_UNLOAD, FETCH_COMMENTS_START } from '../store/constant'
import { useParams } from 'react-router'

const ArticlePage = props => {
  const { articleSlug } = useParams()
  const author = useSelector(state => state.user.profile)
  const article = useSelector(state => state.article.article)
  const comments = useSelector(state => state.comments.comments)

  const dispatch = useDispatch()
  const fetchArticle = useCallback(slug => dispatch({ type: FETCH_ARTICLE_START, slug }), [dispatch])
  const fetchArticleComments = useCallback(slug => dispatch({ type: FETCH_COMMENTS_START, slug }), [dispatch])
  const onPageUnload = useCallback(() => dispatch({ type: ARTICLE_PAGE_UNLOAD }), [dispatch])

  useEffect(() => {
    fetchArticle(articleSlug)
    fetchArticleComments(articleSlug)
    return onPageUnload
  }, [fetchArticle, fetchArticleComments, onPageUnload, articleSlug])

  return (
    <div className="article-page">
      <Banner title={article.title}>
        <ArticleMeta article={article} author={author} />
      </Banner>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.title}</p>
            <h2 id="introducing-ionic">{article.description}</h2>
            <p>{article.body}</p>
            <TagList tags={article.tagList} isOutline />
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMeta article={article} author={author} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentInput article={article} />
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage