import React from 'react'
import ArticlePreview from './ArticlePreview'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isLoading: state.articles.isLoading,
  isError: state.articles.isError
})

function ArticleList(props) {
  const { isError, isLoading, articles, currentUrl } = props
  console.log(currentUrl)
  if (!articles.length) return (<p>No article ...</p>)
  if (isLoading) return (<p>Loading ...</p>)
  if (isError) return (<p>Something went wrong !!!</p>)
  return (
    <div>
      {articles.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <nav>
        <ul className="pagination">
          <li className="page-item active">
            <NavLink to={`${currentUrl}/1`} className="page-link">1</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default connect(mapStateToProps, () => ({}))(ArticleList)