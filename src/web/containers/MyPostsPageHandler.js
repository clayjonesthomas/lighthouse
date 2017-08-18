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

class MyPostsPageHandler extends Component {
  componentDidMount () {
    this.props.getMyPosts()
    this.props.getAllShops()
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

        shops={this.props.shops}
        onAddNewShop={this.props.onAddNewShop}
        onSubmitShops={this.props.onSubmitShops}
        onAddShopFinderRef={this.props.onAddShopFinderRef}
        clearShopFinder={this.props.clearShopFinder}
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

    shops: state.shops,
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

    onAddNewShop: (shops) => dispatch(onUpdateFormShops(shops)),
    getAllShops: () => {
      dispatch(pullShops())
    },
    onSubmitShops: () => {
      dispatch(addShopsToMyShops())
      browserHistory.push('/shops')
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => {dispatch(clearShopFinder())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsPageHandler)