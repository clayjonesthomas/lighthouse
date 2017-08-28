import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {deletePost} from '../actions/FrontPageActions'
import {togglePostLike} from '../actions/PostPageActions'
import {onUpdateFormShops} from '../actions/NewPostActions'
import {addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'
import {pullNotMyShops} from '../actions/FrontPageActions'
import {setMustBeSignedInNotification}
  from '../actions/NotificationActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    this.props.getPosts()
    this.props.getAllShops()
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

        shops={this.props.shops}
        onAddNewShop={this.props.onAddNewShop}
        onSubmitShops={this.props.onSubmitShops}
        onAddShopFinderRef={this.props.onAddShopFinderRef}
        clearShopFinder={this.props.clearShopFinder}

        fireMustSignIn={this.props.fireMustSignIn}
        username={this.props.username}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.displayedPosts,
    arePostsLoaded: state.arePostsLoaded,
    shops: state.shops,
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

    onAddNewShop: (shops) => dispatch(onUpdateFormShops(shops)),
    getAllShops: () => {
      dispatch(pullNotMyShops())
    },
    onSubmitShops: () => {
      dispatch(addShopsToMyShops())
      browserHistory.push("/my_feed")
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => dispatch(clearShopFinder()),
    getMorePosts: () => ownProps.getMorePosts(),
    deletePost: (key) => dispatch(deletePost(key)),
    fireMustSignIn: () => dispatch(setMustBeSignedInNotification())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)