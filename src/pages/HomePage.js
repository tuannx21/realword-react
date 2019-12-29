import React, { Component } from 'react'
import Header from '../component/Header'
import Banner from '../component/Banner'
import ArticleList from '../component/ArticleList'
import TagList from '../component/TagList'

const dummyState = {
  articles: [
    {
      slug: "how-to-train-your-dragon",
      title: "How to train your dragon",
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
    },
    {
      slug: "how-to-train-your-dragon",
      title: "How to train your dragon",
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
    }
  ],
  tags: ["butt", "test", "dragons", "training", "tags", "as", "coffee", "animation", "baby",]
}

class HomePage extends Component {
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
              <ArticleList articles={dummyState.articles} />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagList tags={dummyState.tags} />
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default HomePage