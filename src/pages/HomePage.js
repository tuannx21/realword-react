import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'
import { FETCH_ARTICLES_START, FETCH_TAGS_START, FETCH_ARTICLES_FEED_START } from '../store/constant'
import { NavLink, useParams, useRouteMatch } from 'react-router-dom'

const HomePage = props => {
  const { tag } = useParams()
  const { path } = useRouteMatch()

  const tags = useSelector(state => state.tags.tags)
  const location = useSelector(state => state.router.location)

  const dispatch = useDispatch()
  const fetchArticles = useCallback(params => dispatch({ type: FETCH_ARTICLES_START, params }), [dispatch])
  const fetchArticlesFeed = useCallback(params => dispatch({ type: FETCH_ARTICLES_FEED_START, params }), [dispatch])
  const fetchTags = useCallback(() => dispatch({ type: FETCH_TAGS_START }), [dispatch])

  useEffect(() => {
    path === '/feed' ? fetchArticlesFeed({ ...location.query }) : fetchArticles({ ...location.query, tag })
    fetchTags()
  }, [fetchArticles, fetchArticlesFeed, fetchTags, location.query, path, tag])


  const tabCurrentTag = tag
    ? <li className="nav-item">
      <a href={`/explore/tags/${tag}`} className="nav-link active">{`#${tag}`}</a>
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

export default HomePage