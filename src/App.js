import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import { history } from './store'
import { FETCH_CURRENT_USER } from './store/constant'

const Header = React.lazy(() => import('./component/Header'))
const Footer = React.lazy(() => import('./component/Footer'))

const ArticlePage = React.lazy(() => import('./pages/ArticlePage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))
const EditArticlePage = React.lazy(() => import('./pages/EditArticlePage'))
const SettingPage = React.lazy(() => import('./pages/SettingPage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

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
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/feed">
                <HomePage />
              </Route>
              <Route path="/explore/tags/:tag">
                <HomePage />
              </Route>
              <Route path="/login" render={() => !this.props.currentUser.username ? <LoginPage /> : <Redirect to="/" />} />
              <Route path="/editor/:articleSlug?">
                <EditArticlePage />
              </Route>
              <Route path="/setting">
                <SettingPage />
              </Route>
              <Route path="/signup">
                <RegisterPage />
              </Route>
              <Route path="/article/:articleSlug" >
                <ArticlePage />
              </Route>
              <Route exact path="/user/@:username" >
                <ProfilePage />
              </Route>
              <Route path="/user/@:username/favorited" >
                <ProfilePage />
              </Route>
              <Route component={HomePage} />
            </Switch>
            <Footer />
          </Suspense>
        </ConnectedRouter>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
