import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GET_PROFILE_START, FOLLOW_PROFILE_START, UNFOLLOW_PROFILE_START, CLEAR_PROFILE, FETCH_ARTICLES_START } from '../store/constant'
import ArticleList from '../component/ArticleList'
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => ({
  currentProfile: state.user.profile,
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  fetchArticles: params => dispatch({ type: FETCH_ARTICLES_START, params }),
  getProfile: username => dispatch({ type: GET_PROFILE_START, username }),
  followProfile: username => dispatch({ type: FOLLOW_PROFILE_START, username }),
  unfollowProfile: username => dispatch({ type: UNFOLLOW_PROFILE_START, username }),
  onUnload: () => dispatch({ type: CLEAR_PROFILE })
})

class ProfilePage extends Component {
  componentDidMount() {
    const { match, getProfile, fetchArticles } = this.props

    getProfile(match.params.username)
    match.path.includes('favorited') ? fetchArticles({ favorited: match.params.username }) : fetchArticles({ author: match.params.username })
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  componentDidUpdate(prevProps) {
    const { match, fetchArticles } = this.props

    if (prevProps.match.path !== match.path) {
      match.path.includes('favorited') ? fetchArticles({ favorited: match.params.username }) : fetchArticles({ author: match.params.username })
    }
  }

  render() {
    const { currentProfile, currentUser } = this.props

    const followUserButton = () => {
      if (currentUser.username === currentProfile.username) return null
      return currentProfile.following
        ? <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => this.props.unfollowProfile(currentProfile.username)}><i className="ion-minus-round"></i>&nbsp;Unfollow {currentProfile.username}</button>
        : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => this.props.followProfile(currentProfile.username)}><i className="ion-plus-round"></i>&nbsp;Follow {currentProfile.username}</button>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage) 