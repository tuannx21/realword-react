import React, { Component } from 'react'
import ArticleMeta from '../component/ArticleMeta'
import Banner from '../component/Banner'
import CommentInput from '../component/CommentInput'
import CommentList from '../component/CommentList'

class ArticlePage extends Component {
  render() {
    return (
      <div className="article-page">
        <Banner title="How to build webapps that scale">
          <ArticleMeta />
        </Banner>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>Web development technologies have evolved at an incredible clip over the past few years.</p>
              <h2 id="introducing-ionic">Introducing RealWorld.</h2>
              <p>It's a great solution for learning how other frameworks work.</p>
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <ArticleMeta />
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentInput/>
              <CommentList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticlePage