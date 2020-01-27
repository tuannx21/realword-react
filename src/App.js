import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import { history } from './store'

import Header from './component/Header'
import Footer from './component/Footer'

import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import EditArticlePage from './pages/EditArticlePage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import { FETCH_CURRENT_USER } from './store/constant';

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch({ type: FETCH_CURRENT_USER })
})

class App extends Component {
  constructor(props) {
    super(props)
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/editor" component={EditArticlePage} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/signup" component={RegisterPage} />
            <Route path="/article/:articleSlug" component={ArticlePage} />
            <Route path="/user/@:username" component={ProfilePage} />
          </Switch>
          <Footer />
        </ConnectedRouter>
      </div>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(App)
