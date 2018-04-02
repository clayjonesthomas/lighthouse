import {NEW_SHOP_RESPONSE, GET_UPLOAD_URL_RESPONSE}
  from './NewShopActions'

const defaultNewShopState = {
  uploadUrl: ''
}

export function newShop(state = defaultNewShopState, action) {
  switch (action.type) {
    case GET_UPLOAD_URL_RESPONSE:
      return Object.assign({}, state, {
        uploadUrl: action.data
      })
    case NEW_SHOP_RESPONSE:
      return defaultNewShopState
    default:
      return state
  }
}
