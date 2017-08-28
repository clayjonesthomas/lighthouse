import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import StorePage from '../components/StorePage'
import {pullStore} from '../actions/StorePageActions'
import React, {Component} from 'react'
import {toggleStoreLike} from '../actions/StorePageActions'
import {togglePostLike} from '../actions/PostPageActions'
import {pullShopPosts, pullMoreShopPosts} from '../actions/StorePageActions'
import {pullNotMyShops} from '../actions/FrontPageActions'

import {addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'
import {pullShops, onUpdateFormShops} from '../actions/NewPostActions'
import Spinner from '../components/ui-kit/Spinner'

class StorePageHandler extends Component {
  componentDidMount () {
    this.props.getStore(this.props.params.url_key)
    this.props.getStorePosts(this.props.params.url_key)
    this.props.getAllShops()
  }

  render () {
    if (!this.props.name){
      return <Spinner/>
    }
    else {
      return (
        <StorePage
          name={this.props.name}
          website={this.props.website}
          likes={this.props.likes}
          onLike={this.props.onLike}
          isLiked={this.props.isLiked}

          username={this.props.username}
          deletePost={this.props.deletePost}
          shopPosts={this.props.shopPosts}
          onLikePost={this.props.onLikePost}
          arePostsLoaded={this.props.arePostsLoaded}
          onMorePosts={this.props.onMorePosts}
          areMorePostsLoaded={this.props.areMorePostsLoaded}
          areMorePosts={this.props.areMorePosts}

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
}


const mapStateToProps = (state) => {
  return {
    name: state.store.name,
    website: state.store.website,
    likes: state.store.likes,
    isLiked: state.store.isLiked,
    username: state.username,
    arePostsLoaded: state.arePostsLoaded,
    areMorePostsLoaded: state.areMorePostsLoaded,
    areMorePosts: state.areMorePosts,
    shopPosts: state.displayedPosts,
    isMobile: state.isMobile,
    shops: state.shops,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStore: (url_key) => dispatch(pullStore(url_key)),
    onLike: () => dispatch(toggleStoreLike(ownProps.params.url_key)),
    onLikePost: (post_key) => dispatch(togglePostLike(post_key)),
    onMorePosts: () => dispatch(pullMoreShopPosts(ownProps.params.url_key)),
    getStorePosts: () => dispatch(pullShopPosts(ownProps.params.url_key)),

    onAddNewShop: (shops) => {
      dispatch(onUpdateFormShops(shops))
    },
    getAllShops: () => {
      dispatch(pullNotMyShops())
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
)(StorePageHandler)