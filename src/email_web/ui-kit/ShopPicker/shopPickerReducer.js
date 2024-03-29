import {WRITE_SINGLE_SHOP_PICKER_REF, SHOP_PICKER_TEXT_INPUT,
  SEND_REQUEST_EMAIL_RESPONSE} from './ShopPickerActions'

export function writeSingleShopOnlyShopPickerRef(state = null, action) {
  switch (action.type) {
    case WRITE_SINGLE_SHOP_PICKER_REF:
      return action.data.ref
    default:
      return state
  }
}

export function shopPickerInputText(state = '', action) {
  switch (action.type) {
    case SHOP_PICKER_TEXT_INPUT:
      return action.data
    default:
      return state
  }
}

export function hasSentShopRequest(state = false, action) {
  switch (action.type) {
    case SHOP_PICKER_TEXT_INPUT:
      return false
    case SEND_REQUEST_EMAIL_RESPONSE:
      return true
    default:
      return state
  }
}