import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGOUT_START } from '../store/constant'

const LogInView = props => {
  if (!props.currentUser.username) return null
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link active">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/editor" className="nav-link"><i className="ion-compose"></i> New Post</Link>
      </li>
      <li className="nav-item">
        <Link to="/setting" className="nav-link"><i className="ion-gear-a"></i> Settings</Link>
      </li>
      <li className="nav-item">
        <Link to={`/user/@${props.currentUser.username}`} className="nav-link">{props.currentUser.username}</Link>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={props.onClickLogOut}>Log Out</button>
      </li>
    </ul>
  )
}

const LogOutView = props => {
  if (props.currentUser.username) return null
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link active">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Sign in</Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">Sign up</Link>
      </li>
    </ul>
  )
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: LOGOUT_START })
})

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">conduit</Link>
          <LogInView currentUser={this.props.currentUser} onClickLogOut={this.props.logOut} />
          <LogOutView currentUser={this.props.currentUser} />
        </div>
      </nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)