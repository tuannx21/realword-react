import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
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

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/editor">
            <EditArticlePage />
          </Route>
          <Route path="/setting">
            <SettingPage />
          </Route>
          <Route path="/signup" component={RegisterPage}/>
          <Route path="/article/:articleSlug" component={ArticlePage}/>
          <Route path="/user/@:username" component={ProfilePage}/>
        </Switch>
        <Footer />
      </ConnectedRouter>
    </div>
  );
}

export default App;
