import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deletePost} from '../FrontPage/FrontPageActions'
import {togglePostLike} from './PostPageActions'
import {pullMyPosts, pullMoreMyPosts} from './MyPostsPageActions'
import MyPostsPage from './MyPostsPage'

class MyPostsPageHandler extends Component {
  componentDidMount () {
    this.props.getMyPosts()
  }

  render () {
    return (
      <MyPostsPage
        myPosts={this.props.myPosts}
        onLike={this.props.onLike}
        areMyPostsLoaded={this.props.areMyPostsLoaded}
        deletePost={this.props.deletePost}
        areMoreMyPostsLoaded={this.props.areMoreMyPostsLoaded}
        getMoreMyPosts={this.props.getMoreMyPosts}
        areMoreMyPosts={this.props.areMorePosts}
        isMobile={this.props.isMobile}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myPosts: state.displayedPosts,
    areMyPostsLoaded: state.arePostsLoaded,
    areMoreMyPosts: state.areMorePosts,
    areMoreMyPostsLoaded: state.areMorePostsLoaded,
    isMobile: state.isMobile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPosts: () => {
      dispatch(pullMyPosts())
    },
    getMoreMyPosts: () => {
      dispatch(pullMoreMyPosts)
    },
    onLike: (post_key) => dispatch(togglePostLike(post_key)),
    deletePost: (post_key) => dispatch(deletePost(post_key)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsPageHandler)