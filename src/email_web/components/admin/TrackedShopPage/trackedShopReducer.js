import {PULL_LIKED_SHOPS_RETURN}
  from './TrackedShopActions'


export function trackedShops(state = [], action) {
  switch (action.type) {
    case PULL_LIKED_SHOPS_RETURN:
      return action.data
    default:
      return state
  }
}
