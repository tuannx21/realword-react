import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../component/Header'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'
import { FETCH_ARTICLES } from '../store/constant'

const mapStateToProps = state => ({
  articles: state.articles,
  tags: state.tags
})

const mapDispatchToProps = dispatch => ({
  addArticle: article => dispatch({ type: FETCH_ARTICLES, article })
})

class HomePage extends Component {
  componentDidMount() {
    this.props.addArticle({
      slug: "how-to-train-your-dragon",
      title: "How to train",
      description: "Ever wonder how?",
      body: "It takes a Jacobian",
      tagList: ["dragons", "training"],
      createdAt: "2016-02-18T03:22:56.637Z",
      updatedAt: "2016-02-18T03:48:35.824Z",
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "jake",
        bio: "I work at statefarm",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false
      }
    })
  }

  render() {
    return (
      <div className="home-page">

        <Banner title="conduit">
          <p>A place to share your knowledge.</p>
        </Banner>

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="/">Your Feed</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/">Global Feed</a>
                  </li>
                </ul>
              </div>
              <ArticleList articles={this.props.articles} />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagList tags={this.props.tags} />
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)