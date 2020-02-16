import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'
import { FETCH_ARTICLES_START, FETCH_TAGS_START, FETCH_ARTICLES_FEED_START } from '../store/constant'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({
  isAritclesLoading: state.articles.isLoading,
  fetchArticlesError: state.articles.error,
  tags: state.tags.tags,
  location: state.router.location
})

const mapDispatchToProps = dispatch => ({
  fetchArticles: params => dispatch({ type: FETCH_ARTICLES_START, params }),
  fetchArticlesFeed: params => dispatch({ type: FETCH_ARTICLES_FEED_START, params }),
  fetchTags: () => dispatch({ type: FETCH_TAGS_START }),
})

const HomePage = props => {
  const { fetchArticles, fetchArticlesFeed, fetchTags, tags, location, match } = props

  useEffect(() => {
    match.path === '/feed' ? fetchArticlesFeed({ ...location.query }) : fetchArticles({ ...location.query, tag: match.params.tag })
    fetchTags()
  }, [fetchArticles, fetchArticlesFeed, fetchTags, location.query, match])


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
                  <NavLink to="/feed" className="nav-link" onClick={() => fetchArticlesFeed()}>Your Feed</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link" onClick={() => fetchArticles()}>Global Feed</NavLink>
                </li>
                {tabCurrentTag}
              </ul>
            </div>
            <ArticleList />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList tags={tags} />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)