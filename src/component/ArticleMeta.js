import React from 'react'
import { formatDate } from '../helpers/utils'
import { Link } from 'react-router-dom'

function ArticleMeta(props) {
  const { article, author, onClickFollowProfile, onClickUnfollowProfile } = props

  const favoriteButton = article.favorited
    ? <button className="btn btn-sm btn-primary">
      <i className="ion-heart"></i> Unfavorite Post <span className="counter">({article.favoritesCount})</span>
    </button>
    : <button className="btn btn-sm btn-outline-primary">
      <i className="ion-heart"></i> Favorite Post <span className="counter">({article.favoritesCount})</span>
    </button>

  const followUserButton = author.following
    ? <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => onClickUnfollowProfile(author.username)}><i className="ion-minus-round"></i>&nbsp;Unfollow {author.username}</button>
    : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => onClickFollowProfile(author.username)}><i className="ion-plus-round"></i>&nbsp;Follow {author.username}</button>

  return (
    <div className="article-meta">
      <Link to={`/user/@${author.username}`}><img src={author.image} alt="img" /></Link>
      <div className="info">
        <Link to={`/user/@${author.username}`} className="author">{author.username}</Link>
        <span className="date">{formatDate(new Date(article.createdAt))}</span>
      </div>
      {followUserButton}
      {favoriteButton}
    </div>
  )
}

export default ArticleMeta