import React, {Component} from 'react'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {pullFrontPagePosts, pullMoreFrontPagePosts}
from '../actions/FrontPageActions'
import {togglePostLike} from '../actions/PostPageActions'
import {pullShops, onUpdateFormShops} from '../actions/NewPostActions'
import {addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'

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

        shops={this.props.shops}
        onAddNewShop={this.props.onAddNewShop}
        onSubmitShops={this.props.onSubmitShops}
        onAddShopFinderRef={this.props.onAddShopFinderRef}
        clearShopFinder={this.props.clearShopFinder}
        onMorePosts={this.props.getMorePosts}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.displayedPosts,
    arePostsLoaded: state.arePostsLoaded,
    shops: state.shops,
    areMorePostsLoaded: state.areMorePostsLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(pullFrontPagePosts())
    },
    onLike: (post_key) => dispatch(togglePostLike(post_key)),

    onAddNewShop: (shops) => dispatch(onUpdateFormShops(shops)),
    getAllShops: () => {
      dispatch(pullShops())
    },
    onSubmitShops: () => {
      dispatch(addShopsToMyShops())
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => {dispatch(clearShopFinder())},
    getMorePosts: () => {dispatch(pullMoreFrontPagePosts())},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)