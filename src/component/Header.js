import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_START } from '../store/constant'

const LogInView = props => {
  if (!props.currentUser.username) return null
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/editor" className="nav-link"><i className="ion-compose"></i> New Post</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/setting" className="nav-link"><i className="ion-gear-a"></i> Settings</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/user/@${props.currentUser.username}`} className="nav-link">{props.currentUser.username}</NavLink>
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
        <NavLink exact to="/" className="nav-link">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">Sign in</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">Sign up</NavLink>
      </li>
    </ul>
  )
}

const Header = props => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const dispatch = useDispatch()
  const logOut = () => dispatch({ type: LOGOUT_START })

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">conduit</NavLink>
        <LogInView currentUser={currentUser} onClickLogOut={logOut} />
        <LogOutView currentUser={currentUser} />
      </div>
    </nav>
  )
}

export default Header