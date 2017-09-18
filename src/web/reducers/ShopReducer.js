import {SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {MORE_SHOP_POSTS_RETURN} from 'scenes/ShopPage/ShopPageActions'
import {REQUEST_SHOP_RETURN} from 'scenes/ShopPage/ShopPageActions'

export function shop(state = {}, action){
  switch(action.type) {
    case REQUEST_SHOP_RETURN:
      return action.data.shop
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