import React from 'react'
import { formatDate } from '../helpers/utils'
import { Link } from 'react-router-dom'
import { FOLLOW_PROFILE_START, UNFOLLOW_PROFILE_START, FAVORITE_ARTICLE_START, UNFAVORITE_ARTICLE_START, DELETE_ARTICLE_START } from '../store/constant'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  followProfile: username => dispatch({ type: FOLLOW_PROFILE_START, username }),
  unfollowProfile: username => dispatch({ type: UNFOLLOW_PROFILE_START, username }),
  favoriteArticle: slug => dispatch({ type: FAVORITE_ARTICLE_START, slug }),
  unfavoriteArticle: slug => dispatch({ type: UNFAVORITE_ARTICLE_START, slug }),
  deleteArticle: slug => dispatch({ type: DELETE_ARTICLE_START, slug })
})

const OwnerView = props => {
  const { article, deleteArticle } = props
  
  return (
    <span>
      <Link to={`/editor/${article.slug}`} className="btn btn-outline-secondary btn-sm"><i className="ion-edit"></i> Edit Article</Link>
      &nbsp;
      <button className="btn btn-outline-danger btn-sm" onClick={() => deleteArticle(article.slug)}><i className="ion-trash-a"></i> Delete Article</button>
    </span>
  )
}

const DefaultView = props => {
  const { article, author, unfavoriteArticle, favoriteArticle, unfollowProfile, followProfile } = props

  const favoriteButtonSwitcher = article.favorited
    ? <button className="btn btn-sm btn-primary" onClick={() => unfavoriteArticle(article.slug)}>
      <i className="ion-heart"></i> Unfavorite Post <span className="counter">({article.favoritesCount})</span>
    </button>
    : <button className="btn btn-sm btn-outline-primary" onClick={() => favoriteArticle(article.slug)}>
      <i className="ion-heart"></i> Favorite Post <span className="counter">({article.favoritesCount})</span>
    </button>

  const followButtonSwitcher = author.following
    ? <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => unfollowProfile(author.username)}><i className="ion-minus-round"></i>&nbsp;Unfollow {author.username}</button>
    : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => followProfile(author.username)}><i className="ion-plus-round"></i>&nbsp;Follow {author.username}</button>

  return (
    <span>
      {followButtonSwitcher}
      &nbsp;
      {favoriteButtonSwitcher}
    </span>
  )
}

function ArticleMeta(props) {
  const { article, author, currentUser, followProfile, unfollowProfile, favoriteArticle, unfavoriteArticle, deleteArticle } = props

  return (
    <div className="article-meta">
      <Link to={`/user/@${author.username}`}><img src={author.image} alt="img" /></Link>
      <div className="info">
        <Link to={`/user/@${author.username}`} className="author">{author.username}</Link>
        <span className="date">{formatDate(new Date(article.createdAt))}</span>
      </div>
      {currentUser.username === author.username
        ? <OwnerView article={article} deleteArticle={deleteArticle} />
        : <DefaultView article={article}
          author={author}
          followProfile={followProfile}
          unfollowProfile={unfollowProfile}
          favoriteArticle={favoriteArticle}
          unfavoriteArticle={unfavoriteArticle} />}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleMeta)