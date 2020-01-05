import React from 'react'
import { Link } from 'react-router-dom'

function ArticlePreview(props) {
  const { slug, title, description, body, tagList, favorited, createdAt, favoritesCount, author } = props.article

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html"><img src={author.image} alt="img" /></a>
        <div className="info">
          <a href="/" className="author">{author.username}</a>
          <span className="date">{createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right"><i className="ion-heart"></i> {favoritesCount}</button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

export default ArticlePreview