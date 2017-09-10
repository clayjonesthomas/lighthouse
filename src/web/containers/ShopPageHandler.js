import {connect} from 'react-redux'
import ShopPage from '../components/ShopPage'
import {pullStore} from '../actions/ShopPageActions'
import React, {Component} from 'react'
import {toggleStoreLike} from '../actions/ShopPageActions'
import {togglePostLike} from '../actions/PostPageActions'
import {pullShopPosts, pullMoreShopPosts} from '../actions/ShopPageActions'
import Spinner from '../components/ui-kit/Spinner'

class ShopPageHandler extends Component {
  componentDidMount () {
    this.props.getStore(this.props.params.url_key)
    this.props.getStorePosts(this.props.params.url_key)
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStore: (url_key) => dispatch(pullStore(url_key)),
    onLike: () => dispatch(toggleStoreLike(ownProps.params.url_key)),
    onLikePost: (post_key) => dispatch(togglePostLike(post_key)),
    onMorePosts: () => dispatch(pullMoreShopPosts(ownProps.params.url_key)),
    getStorePosts: () => dispatch(pullShopPosts(ownProps.params.url_key)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPageHandler)