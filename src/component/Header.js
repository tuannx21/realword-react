import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">conduit</Link>
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
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header