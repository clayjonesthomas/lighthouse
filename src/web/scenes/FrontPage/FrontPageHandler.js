import React, {Component} from 'react'
import {connect} from 'react-redux'
import FrontPage from './FrontPage'
import {deletePost} from './FrontPageActions'
import {togglePostLike} from '../MyPostsPage/PostPageActions'
import {setMustBeSignedInNotification}
  from '../notifications/NotificationActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    this.props.getPosts()
  }

  render () {
    return (
      <FrontPage
        posts={this.props.posts}
        arePostsLoaded={this.props.arePostsLoaded}
        onLike={this.props.onLike}
        onMorePosts={this.props.getMorePosts}
        areMorePostsLoaded={this.props.areMorePostsLoaded}
        areMorePosts={this.props.areMorePosts}
        deletePost={this.props.deletePost}
        isMobile={this.props.isMobile}

        fireMustSignIn={this.props.fireMustSignIn}
        username={this.props.username}
        isMyFeed={this.props.isMyFeed}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.displayedPosts,
    arePostsLoaded: state.arePostsLoaded,
    areMorePostsLoaded: state.areMorePostsLoaded,
    areMorePosts: state.areMorePosts,
    isMobile: state.isMobile,
    username: state.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => ownProps.getPosts(),
    onLike: (post_key) => dispatch(togglePostLike(post_key)),
    getMorePosts: () => ownProps.getMorePosts(),
    deletePost: (key) => dispatch(deletePost(key)),
    fireMustSignIn: () => dispatch(setMustBeSignedInNotification())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)