import {EDIT_SHOP_PICKER_CHANGE, GET_UPLOAD_URL_RESPONSE,
  ADMIN_SHOP_NAME_CHANGE, ADMIN_SHOP_SITE_CHANGE,
  ADMIN_SHOP_ALT_NAMES_CHANGE} from './NewShopActions'

const defaultNewShopState = {
  uploadUrl: '',
  shopNameValue: '',
  shopAltNamesValue: '',
  shopSiteValue: ''
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
    default:
      return state
  }
}

const defaultEditShopState = {
  uploadUrl: '',
  shopKey: '',
  shopNameValue: '',
  shopAltNamesValue: '',
  shopSiteValue: '',
  shopIconImageUrl: ''
}

export function editShop(state = defaultEditShopState, action) {
  switch (action.type) {
    case GET_UPLOAD_URL_RESPONSE:
      return Object.assign({}, state, {
        uploadUrl: action.data
      })
    case EDIT_SHOP_PICKER_CHANGE:
      if (!action.data) {
        return defaultEditShopState
      }
      return Object.assign({}, state, {
        shopKey: action.data.key,
        shopNameValue: action.data.name,
        shopAltNamesValue: action.data.alternate_names,
        shopSiteValue: action.data.website,
        shopIconImageUrl: action.data.icon_image_serving_url
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
    default:
      return state
  }
}
