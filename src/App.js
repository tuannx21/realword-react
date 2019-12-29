import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './component/Header'
import Footer from './component/Footer'

import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import EditArticlePage from './pages/EditArticlePage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          <Route path="/@:articleId">
            <ArticlePage />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
