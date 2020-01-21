import React, { Component } from 'react'
import { connect } from 'react-redux'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'
import * as types from '../store/constant'

const mapStateToProps = state => ({
  isAritclesLoading: state.articles.isLoading,
  fetchArticlesError: state.articles.error,
  articles: state.articles.articles,
  tags: state.tags.tags
})

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch({ type: types.FETCH_ARTICLES_START }),
  fetchTags: () => dispatch({ type: types.FETCH_TAGS_START })
})

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchArticles()
    this.props.fetchTags()
  }

  render() {
    return (
      <div className="home-page">

        <Banner title="conduit">
          <p>A place to share your knowledge.</p>
        </Banner>

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="/">Your Feed</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/">Global Feed</a>
                  </li>
                </ul>
              </div>
              <ArticleList isError={this.props.fetchArticlesError} isLoading={this.props.isAritclesLoading} articles={this.props.articles} />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagList tags={this.props.tags} />
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)