import {connect} from 'react-redux'
import ShopPage from './ShopPage'
import {pullShop, toggleEditShop} from './ShopPageActions'
import React, {Component} from 'react'
import {toggleShopLike} from './ShopPageActions'
import {togglePostLike} from '../MyPostsPage/PostPageActions'
import {pullShopPosts, pullMoreShopPosts} from './ShopPageActions'
import {setMustBeSignedInNotification}
  from 'scenes/notifications/NotificationActions'
import Spinner from 'ui-kit/Spinner'
import {onSaveRef} from '../NewPostPage/NewPostActions' //TODO move to utility
import {submitShopEdits} from './ShopPageActions'

class ShopPageHandler extends Component {
  componentDidMount () {
    this.props.getShop(this.props.params.url_key)
    this.props.getShopPosts(this.props.params.url_key)
  }

  render () {
    if (!this.props.name){
      return <Spinner/>
    }
    else {
      return (
        <ShopPage
          name={this.props.name}
          website={this.props.website}
          iconUrl={this.props.iconUrl}
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
          fireMustSignIn={this.props.fireMustSignIn}

          isMobile={this.props.isMobile}

          isModerator={this.props.isModerator}
          toggleEditShop={this.props.toggleEditShop}
          isEditShop={this.props.isEditShop}
          onSaveShopNameRef={this.props.onSaveShopNameRef}
          onSaveShopWebsiteRef={this.props.onSaveShopWebsiteRef}
          onSaveShopIconUrlRef={this.props.onSaveShopIconUrlRef}
          onSubmitEditShop={this.props.onSubmitEditShop}
          onCancelEditShop={this.props.onCancelEditShop}
        />
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    name: state.shop.name,
    website: state.shop.website,
    iconUrl: state.shop.icon_url,
    likes: state.shop.likes,
    isLiked: state.shop.isLiked,
    username: state.username,
    arePostsLoaded: state.arePostsLoaded,
    areMorePostsLoaded: state.areMorePostsLoaded,
    areMorePosts: state.areMorePosts,
    shopPosts: state.displayedPosts,
    isMobile: state.isMobile,
    isModerator: state.isModerator,
    isEditShop: state.isEditShop,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getShop: (url_key) => dispatch(pullShop(url_key)),
    onLike: () => dispatch(toggleShopLike(ownProps.params.url_key)),
    onLikePost: (post_key) => dispatch(togglePostLike(post_key)),
    onMorePosts: () => dispatch(pullMoreShopPosts(ownProps.params.url_key)),
    getShopPosts: () => dispatch(pullShopPosts(ownProps.params.url_key)),
    toggleEditShop: () => dispatch(toggleEditShop()),
    onSaveShopNameRef: (ref) => dispatch(onSaveRef(ref, 'shop_name')),
    onSaveShopWebsiteRef: (ref) => dispatch(onSaveRef(ref, 'shop_website')),
    onSaveShopIconUrlRef: (ref) => dispatch(onSaveRef(ref, 'icon_url')),
    onSubmitEditShop: () => dispatch(submitShopEdits(ownProps.params.url_key)),
    onCancelEditShop: () => {dispatch(toggleEditShop())},
    fireMustSignIn: () =>
      dispatch(setMustBeSignedInNotification(undefined,
        "to like a store"
      )),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPageHandler)