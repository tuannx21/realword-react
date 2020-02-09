import React, { Component } from 'react'
import { connect } from 'react-redux'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'
import { FETCH_ARTICLES_START, FETCH_TAGS_START, FETCH_ARTICLES_FEED_START } from '../store/constant'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({
  isAritclesLoading: state.articles.isLoading,
  fetchArticlesError: state.articles.error,
  tags: state.tags.tags
})

const mapDispatchToProps = dispatch => ({
  fetchArticles: params => dispatch({ type: FETCH_ARTICLES_START, params }),
  fetchArticlesFeed: () => dispatch({ type: FETCH_ARTICLES_FEED_START }),
  fetchTags: () => dispatch({ type: FETCH_TAGS_START }),
})

class HomePage extends Component {
  componentDidMount() {
    const { fetchArticles, fetchArticlesFeed, fetchTags, match } = this.props

    match.path === '/feed' ? fetchArticlesFeed() : fetchArticles({ tag: match.params.tag })
    fetchTags()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tag !== this.props.match.params.tag) this.props.fetchArticles({ tag: this.props.match.params.tag })
  }

  render() {
    const { match } = this.props

    const tabCurrentTag = match.params.tag
      ? <li className="nav-item">
        <a href={`/explore/tags/${match.params.tag}`} className="nav-link active">{`#${match.params.tag}`}</a>
      </li>
      : null

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
                    <NavLink to="/feed" className="nav-link" onClick={() => this.props.fetchArticlesFeed()}>Your Feed</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to="/" className="nav-link" onClick={() => this.props.fetchArticles()}>Global Feed</NavLink>
                  </li>
                  {tabCurrentTag}
                </ul>
              </div>
              <ArticleList currentUrl={match.url}/>
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