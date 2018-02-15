import {ADMIN_SHOP_NAME_CHANGE, ADMIN_SHOP_SITE_CHANGE,
  NEW_SHOP_RESPONSE, ADMIN_SHOP_ALT_NAMES_CHANGE}
  from './NewShopActions'

const defaultNewShopState = {
  shopNameValue: '',
  shopAltNamesValue: '',
  shopSiteValue: ''
}

export function newShop(state = defaultNewShopState, action) {
  switch (action.type) {
    case ADMIN_SHOP_NAME_CHANGE:
      return Object.assign({}, state, {
        shopNameValue: action.data
      })
    case ADMIN_SHOP_ALT_NAMES_CHANGE:
      return Object.assign({}, state, {
        shopAltNamesValue: action.data
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
