import {SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {MORE_SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {REQUEST_SHOP_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {LIKE_SHOP} from 'scenes/ShopPage/ShopPageActions'
import {TOGGLE_EDIT_SHOP} from 'scenes/ShopPage/ShopPageActions'

export function shop(state = {}, action){
  switch(action.type) {
    case REQUEST_SHOP_RETURN:
      return action.data.shop
    case LIKE_SHOP:
      if (state.likes >= 0) {
        return Object.assign({}, state, {
          likes: state.likes += state.isLiked ? -1 : 1,
          isLiked: !state.isLiked
        })
      }
      return state
    default:
      return state
  }
}

export function shopPostsOffset(state = 0, action){
  switch(action.type){
    case SHOP_POSTS_RETURN:
      return 10
    case MORE_SHOP_POSTS_RETURN:
      return state+10
    default:
      return state
  }
}

export function isEditShop(state = false, action) {
  switch(action.type) {
    case TOGGLE_EDIT_SHOP:
      return !state
    default:
      return state
  }
}