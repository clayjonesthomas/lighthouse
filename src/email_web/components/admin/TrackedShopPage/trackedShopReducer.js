import {PULL_LIKED_SHOPS_RETURN}
  from './TrackedShopActions'

const defaultAdminState = {
  shops: []
}

export function trackedShops(state = defaultAdminState, action) {
  switch (action.type) {
    case PULL_LIKED_SHOPS_RETURN:
      return Object.assign({}, state, {
        shops: action.data
      })
    default:
      return state
  }
}
