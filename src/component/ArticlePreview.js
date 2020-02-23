import React from 'react'
import TagList from './TagList'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers/utils'
import { useDispatch } from 'react-redux'
import { FAVORITE_ARTICLE_START, UNFAVORITE_ARTICLE_START } from '../store/constant'

const ArticlePreview = props => {
  const { article } = props

  const dispatch = useDispatch()
  const favoriteArticle = slug => dispatch({ type: FAVORITE_ARTICLE_START, slug })
  const unFavoriteArticle = slug => dispatch({ type: UNFAVORITE_ARTICLE_START, slug })

  const favoriteButton = article.favorited
    ? <button className="btn btn-primary btn-sm pull-xs-right" onClick={() => unFavoriteArticle(article.slug)}><i className="ion-heart"></i> {article.favoritesCount}</button>
    : <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={() => favoriteArticle(article.slug)}><i className="ion-heart"></i> {article.favoritesCount}</button>

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/user/@${article.author.username}`}><img src={article.author.image} alt="img" /></Link>
        <div className="info">
          <Link to={`/user/@${article.author.username}`} className="author">{article.author.username}</Link>
          <span className="date">{formatDate(new Date(article.createdAt))}</span>
        </div>
        {favoriteButton}
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
      <TagList tags={article.tagList} style={{ float: 'right' }} isOutline />
    </div >
  )
}

export default ArticlePreview