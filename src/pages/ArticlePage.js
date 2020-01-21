import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleMeta from '../component/ArticleMeta'
import Banner from '../component/Banner'
import CommentInput from '../component/CommentInput'
import CommentList from '../component/CommentList'
import * as types from '../store/constant'

const mapStateToProps = state => ({
  article: state.article.article
})

const mapDispatchToProps = dispatch => ({
  fetchArticle: slug => dispatch({ type: types.FETCH_ARTICLE_START, slug })
})

class ArticlePage extends Component {
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleSlug)
  }

  render() {
    const { article } = this.props
    
    return (
      <div className="article-page">
        <Banner title={article.title}>
          <ArticleMeta />
        </Banner>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.title}</p>
              <h2 id="introducing-ionic">{article.description}</h2>
              <p>{article.body}</p>
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <ArticleMeta />
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentInput />
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)