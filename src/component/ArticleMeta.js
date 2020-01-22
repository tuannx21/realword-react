import React from 'react'

function ArticleMeta(props) {
  const { article, onClickFollowProfile, onClickUnfollowProfile } = props

  const followUserButton = article.author.following 
    ? <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => onClickUnfollowProfile(article.author.username)}><i className="ion-minus-round"></i>&nbsp;Unfollow {article.author.username}</button>
    : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => onClickFollowProfile(article.author.username)}><i className="ion-plus-round"></i>&nbsp;Follow {article.author.username}</button>

  return (
    <div className="article-meta">
      <a href="/"><img src="http://i.imgur.com/Qr71crq.jpg" alt="img" /></a>
      <div className="info">
        <a href="/" className="author">{article.author.username}</a>
        <span className="date">{article.createdAt}></span>
      </div>
      {followUserButton}
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i> Favorite Post <span className="counter">(29)</span>
      </button>
    </div>
  )
}

export default ArticleMeta