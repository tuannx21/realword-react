import React from 'react'
import ArticlePreview from './ArticlePreview'

function ArticleList(props) {
  return (
    <div>
      {
        props.articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))
      }
    </div>

  )
}

export default ArticleList