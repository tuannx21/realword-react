import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GET_PROFILE_START, FOLLOW_PROFILE_START, UNFOLLOW_PROFILE_START, CLEAR_PROFILE } from '../store/constant'

const mapStateToProps = state => ({
  currentProfile: state.user.profile,
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfile: username => dispatch({ type: GET_PROFILE_START, username }),
  followProfile: username => dispatch({ type: FOLLOW_PROFILE_START, username }),
  unfollowProfile: username => dispatch({ type: UNFOLLOW_PROFILE_START, username }),
  onUnload: () => dispatch({ type: CLEAR_PROFILE })
})

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.username)
  }

  componentWillUnmount() {
    this.props.onUnload()
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
                    <a className="nav-link active" href="/">My Articles</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">Favorited Articles</a>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="/"><img src="http://i.imgur.com/Qr71crq.jpg" alt="article" /></a>
                  <div className="info">
                    <a href="/" className="author">Eric Simons</a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right"><i className="ion-heart"></i> 29</button>
                </div>
                <a href="/" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="/"><img src="http://i.imgur.com/N4VcUeJ.jpg" alt="article" /></a>
                  <div className="info">
                    <a href="/" className="author">Albert Pai</a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right"><i className="ion-heart"></i> 32</button>
                </div>
                <a href="/" className="preview-link">
                  <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline">Music</li>
                    <li className="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage) 