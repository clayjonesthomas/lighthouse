import {REQUEST_SHOPS, REQUEST_SHOPS_RETURN}
  from '../scenes/NewPostPage/NewPostActions.js'
import {LIKE_SHOP} from '../scenes/ShopPage/ShopPageActions'
import {REQUEST_MY_SHOPS, REQUEST_MY_SHOPS_RETURN,
  ADD_SHOPS_TO_MY_SHOPS_RETURN} from '../scenes/MyShopsPage/MyShopsPageActions'

export function shops(state = [], action){
  switch(action.type) {
    case REQUEST_SHOPS_RETURN:
      return action.data.shops
    default:
      return state
  }
}

export function areMyShopsLoaded(state = false, action) {
  switch(action.type) {
    case REQUEST_MY_SHOPS:
      return false
    case REQUEST_MY_SHOPS_RETURN:
      if(action.data.shops)
        return true
      return state
    default:
      return state
  }
}

export function areShopsLoaded(state = false, action) {
  switch(action.type) {
    case REQUEST_SHOPS:
      return false
    case REQUEST_SHOPS_RETURN:
      return true
    default:
      return state
  }
}

export function displayedShops(state = [], action) {
  switch (action.type) {
    case LIKE_SHOP:
      return state.map(shop => {
          if(shop.key === action.data.shop_key) {
            shop.likes += shop.isLiked ? -1 : 1
            shop.isLiked = !shop.isLiked
          }
          return shop
        })
    case REQUEST_MY_SHOPS_RETURN:
      if(action.data.shops)
        return action.data.shops
      return state
    case ADD_SHOPS_TO_MY_SHOPS_RETURN:
      return state.concat(action.data.shopsToAdd)
    default:
      return state
  }
}
