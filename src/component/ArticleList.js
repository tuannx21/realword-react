import React from 'react'
import ArticlePreview from './ArticlePreview'
import Pagination from './Pagination'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  articles: state.articles.articles,
  articlesCount: state.articles.articlesCount,
  isLoading: state.articles.isLoading,
  isError: state.articles.isError
})

function ArticleList(props) {
  const { isError, isLoading, articles, articlesCount } = props
  if (!articles.length) return (<p>No article ...</p>)
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

export default connect(mapStateToProps, () => ({}))(ArticleList)