import {ADMIN_SHOP_NAME_CHANGE, ADMIN_SHOP_SITE_CHANGE,
  NEW_SHOP_RESPONSE, ADMIN_SHOP_ALT_NAMES_CHANGE,
  GET_UPLOAD_URL_RESPONSE}
  from './NewShopActions'

const defaultNewShopState = {
  shopNameValue: '',
  shopAltNamesValue: '',
  shopSiteValue: '',
  uploadUrl: ''
}

export function newShop(state = defaultNewShopState, action) {
  switch (action.type) {
    case GET_UPLOAD_URL_RESPONSE:
      return Object.assign({}, state, {
        uploadUrl: action.data
      })
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
