import React from 'react'
import ArticlePreview from './ArticlePreview'
import Pagination from './Pagination'
import { useSelector } from 'react-redux'

const ArticleList = props => {
  const articles = useSelector(state => state.articles.articles)
  const articlesCount = useSelector(state => state.articles.articlesCount)
  const isError = useSelector(state => state.articles.error)
  const isLoading = useSelector(state => state.articles.isLoading)

  if (!articles.length && !isLoading) return (<p>No article ...</p>)
  if (isLoading) return (<p>Loading ...</p>)
  if (isError) return (<p>Something went wrong !!!</p>)
  return (
    <div>
      {articles.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <Pagination totalItems={articlesCount} />
    </div>
  )
}

export default ArticleList