import { combineReducers } from 'redux'
import {displayedShops, shops, areMyShopsLoaded,
  areShopsLoaded} from './ShopsReducer'
import {shop, shopPostsOffset} from './ShopReducer'
import {displayedPosts, postsOffset, areMorePosts,
  areMorePostsLoaded} from './PostsReducer'
import {username, isUserInfoLoaded, isModerator, isMobile}
  from './UserReducer'
import {formRefs, form, serverMessageArray} from './FormReducer'

export default combineReducers({
  displayedShops,
  shops,
  areMyShopsLoaded,
  areShopsLoaded,
  shop,
  shopPostsOffset,
  displayedPosts,
  postsOffset,
  areMorePosts,
  areMorePostsLoaded,
  username,
  isUserInfoLoaded,
  isModerator,
  isMobile,
  formRefs,
  form,
  serverMessageArray
})