import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {deletePost} from '../actions/FrontPageActions'
import {togglePostLike} from '../actions/PostPageActions'
import {pullMyPosts, pullMoreMyPosts} from '../actions/MyPostsPageActions'
import MyPostsPage from '../components/MyPostsPage'

import {addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'
import {pullShops, onUpdateFormShops} from '../actions/NewPostActions'
import {pullNotMyShops} from '../actions/FrontPageActions'

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