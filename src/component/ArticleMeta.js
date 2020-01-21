import React from 'react'

function ArticleMeta(props) {
  const { article } = props

  if (!article) {
    return <div>asdadasdas</div>
  }
  
  return (
    <div className="article-meta" key={article.slug}>
      <a href="/"><img src="http://i.imgur.com/Qr71crq.jpg" alt="img" /></a>
      <div className="info">
        <a href="/" className="author">{article.author.username}</a>
        <span className="date"></span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i> Follow Eric Simons <span className="counter">(10)</span>
      </button>
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i> Favorite Post <span className="counter">(29)</span>
      </button>
    </div>
  )
}

export default ArticleMeta