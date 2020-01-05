import React from 'react'
import ArticlePreview from './ArticlePreview'

function ArticleList(props) {
  const { isError, isLoading, articles } = props

  if (isLoading) return (<p>Loading ...</p>)
  if (isError) return (<p>Something went wrong !!!</p>)
  return (
    <div>
      {articles.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </div>

  )
}

export default ArticleList