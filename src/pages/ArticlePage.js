import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleMeta from '../component/ArticleMeta'
import Banner from '../component/Banner'
import CommentInput from '../component/CommentInput'
import CommentList from '../component/CommentList'
import TagList from '../component/TagList'
import { FETCH_ARTICLE_START, FOLLOW_PROFILE_START, UNFOLLOW_PROFILE_START, FAVORITE_ARTICLE_START, UNFAVORITE_ARTICLE_START } from '../store/constant'

const mapStateToProps = state => ({
  author: state.user.profile,
  article: state.article.article,
  isArticleLoading: state.article.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchArticle: slug => dispatch({ type: FETCH_ARTICLE_START, slug }),
  followProfile: username => dispatch({ type: FOLLOW_PROFILE_START, username }),
  unfollowProfile: username => dispatch({ type: UNFOLLOW_PROFILE_START, username }),
  favoriteArticle: slug => dispatch({ type: FAVORITE_ARTICLE_START, slug }),
  unfavoriteArticle: slug => dispatch({ type: UNFAVORITE_ARTICLE_START, slug })
})

class ArticlePage extends Component {
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleSlug)
  }

  render() {
    const { article, isArticleLoading, followProfile, unfollowProfile, author, favoriteArticle, unfavoriteArticle } = this.props
    const { tagList } = article
    if (isArticleLoading) {
      return (<div>loading ...</div>)
    }

    return (
      <div className="article-page">
        <Banner title={article.title}>
          <ArticleMeta article={article} author={author}
            onClickFollowProfile={followProfile}
            onClickUnfollowProfile={unfollowProfile}
            onClickFavoritePost={favoriteArticle}
            onClickUnfavoritePost={unfavoriteArticle} />
        </Banner>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.title}</p>
              <h2 id="introducing-ionic">{article.description}</h2>
              <p>{article.body}</p>
              <TagList tags={tagList} isOutline/>
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <ArticleMeta article={article} author={author}
              onClickFollowProfile={followProfile}
              onClickUnfollowProfile={unfollowProfile}
              onClickFavoritePost={favoriteArticle}
              onClickUnfavoritePost={unfavoriteArticle} />
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentInput />
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)