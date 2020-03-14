import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_PROFILE_START, FOLLOW_PROFILE_START, UNFOLLOW_PROFILE_START, CLEAR_PROFILE, FETCH_ARTICLES_START } from '../store/constant'
import ArticleList from '../component/ArticleList'
import { NavLink, useRouteMatch, useParams } from 'react-router-dom'

const ProfilePage = props => {
  const { path } = useRouteMatch()
  const { username } = useParams()

  const currentProfile = useSelector(state => state.user.profile)
  const currentUser = useSelector(state => state.auth.currentUser)
  const location = useSelector(state => state.router.location)

  const dispatch = useDispatch()
  const fetchArticles = useCallback(params => dispatch({ type: FETCH_ARTICLES_START, params }), [dispatch])
  const getProfile = useCallback(username => dispatch({ type: GET_PROFILE_START, username }), [dispatch])
  const followProfile = useCallback(username => dispatch({ type: FOLLOW_PROFILE_START, username }), [dispatch])
  const unfollowProfile = useCallback( username => dispatch({ type: UNFOLLOW_PROFILE_START, username }), [dispatch])
  const onPageUnload = useCallback(() => dispatch({ type: CLEAR_PROFILE }), [dispatch])

  useEffect(() => {
    getProfile(username)

    path.includes('favorited')
      ? fetchArticles({ ...location.query, favorited: username })
      : fetchArticles({ ...location.query, author: username })

    return onPageUnload
  }, [path, location, getProfile, fetchArticles, onPageUnload, username])

  const followUserButton = () => {
    if (currentUser.username === currentProfile.username) return null
    return currentProfile.following
      ? <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => unfollowProfile(currentProfile.username)}><i className="ion-minus-round"></i>&nbsp;Unfollow {currentProfile.username}</button>
      : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => followProfile(currentProfile.username)}><i className="ion-plus-round"></i>&nbsp;Follow {currentProfile.username}</button>
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={currentProfile.image} className="user-img" alt="avatar" />
              <h4>{currentProfile.username}</h4>
              <p>{currentProfile.bio}</p>
              {followUserButton()}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink exact to={`/user/@${currentProfile.username}`} className="nav-link">My Articles</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to={`/user/@${currentProfile.username}/favorited`} className="nav-link">Favorited Articles</NavLink>
                </li>
              </ul>
            </div>
            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage