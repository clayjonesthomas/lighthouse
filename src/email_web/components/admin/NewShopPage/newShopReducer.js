import {ADMIN_SHOP_TITLE_CHANGE, ADMIN_SHOP_SITE_CHANGE,
  NEW_SHOP_RESPONSE}
  from './NewShopActions'

const defaultNewShopState = {
  shopTitleValue: '',
  shopAltNamesValue: '',
  shopSiteValue: ''
}

export function newShop(state = defaultNewShopState, action) {
  switch (action.type) {
    case ADMIN_SHOP_TITLE_CHANGE:
      return Object.assign({}, state, {
        shopTitleValue: action.data
      })
    case ADMIN_SHOP_SITE_CHANGE:
      return Object.assign({}, state, {
        shopSiteValue: action.data
      })
    case NEW_SHOP_RESPONSE:
      return defaultNewShopState
    default:
      return state
  }
}
