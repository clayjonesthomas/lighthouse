import {getUniquePosts} from './utils'
import {REQUEST_POSTS, REQUEST_POSTS_RETURN} from 'scenes/FrontPage/FrontPageActions'
import {LIKE_POST} from 'scenes/MyPostsPage/PostPageActions'
import {MORE_POSTS_REQUEST, MORE_POSTS_RETURN} from 'scenes/FrontPage/FrontPageActions'
import {SHOP_POSTS_REQUEST, SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {MORE_SHOP_POSTS_REQUEST, MORE_SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {MY_POSTS_REQUEST, MY_POSTS_RESPONSE} from 'scenes/MyPostsPage/MyPostsPageActions'
import {MORE_MY_POSTS_REQUEST, MORE_MY_POSTS_RESPONSE} from 'scenes/MyPostsPage/MyPostsPageActions'
import {ARCHIVE_POST_RETURN} from 'scenes/MyPostsPage/PostPageActions'

export function displayedPosts(state = [], action){
  switch(action.type) {
    case REQUEST_POSTS_RETURN:
      if(action.data.posts)
        return action.data.posts
      return state
    case LIKE_POST:
      return state.map(post => {
          if(post.key === action.data.post_key) {
            post.likes += post.isLiked ? -1 : 1
            post.isLiked = !post.isLiked
          }
          return post
        })
    case MORE_POSTS_RETURN:
      let newPosts = getUniquePosts(action.data.posts, state)
      return state.concat(newPosts)
    case SHOP_POSTS_RETURN:
      return action.data.shopPosts
    case MORE_SHOP_POSTS_RETURN:
      let newShopPosts = getUniquePosts(action.data.shopPosts, state)
      return state.concat(newShopPosts)
    case MY_POSTS_RESPONSE:
      return action.data.posts
    case MORE_MY_POSTS_RESPONSE:
      let newMyPosts = getUniquePosts(action.data.posts, state)
      return state.concat(newMyPosts)
    case ARCHIVE_POST_RETURN:
      if (action.data.isArchived) {
        let indexOfArchivedObject = state.findIndex(post =>
          post.key === action.data.postKey)
        let newDisplayedPosts = state.slice()
        newDisplayedPosts.splice(indexOfArchivedObject, 1)
        return newDisplayedPosts
      }
      return state
    default:
      return state
  }
}

export function arePostsLoaded(state = false, action) {
  switch(action.type) {
    case REQUEST_POSTS:
      return false
    case REQUEST_POSTS_RETURN:
      if(action.data.posts)
        return true
      return state
    case SHOP_POSTS_REQUEST:
      return false
    case SHOP_POSTS_RETURN:
      return true
    case MY_POSTS_REQUEST:
      return false
    case MY_POSTS_RESPONSE:
      return true
    default:
      return state
  }
}

export function postsOffset(state = [], action){
  switch(action.type) {
    case REQUEST_POSTS:
      return 10
    case MORE_POSTS_RETURN:
      return state+10
    default:
      return state
  }
}

export function areMorePosts(state = true, action){
  switch(action.type) {
    case REQUEST_POSTS:
      return true
    case MORE_POSTS_RETURN:
      return action.data.posts.length === 10
    case SHOP_POSTS_REQUEST:
      return true
    case MORE_SHOP_POSTS_RETURN:
      return action.data.shopPosts.length === 10 //changed behavior
    case MY_POSTS_REQUEST:
      return true
    case MORE_MY_POSTS_RESPONSE:
      return action.data.posts.length === 10
    default:
      return state
  }
}
export function areMorePostsLoaded(state = false, action){
  switch(action.type) {
    case MORE_POSTS_REQUEST:
      return false
    case MORE_POSTS_RETURN:
      return true
    case MORE_SHOP_POSTS_REQUEST:
      return false
    case MORE_SHOP_POSTS_RETURN:
      return true
    case MORE_MY_POSTS_REQUEST:
      return false
    case MORE_MY_POSTS_RESPONSE:
      return true
    default:
      return state
  }
}