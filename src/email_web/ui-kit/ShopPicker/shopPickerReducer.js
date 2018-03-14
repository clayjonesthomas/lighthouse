import {WRITE_SINGLE_SHOP_PICKER_REF} from './ShopPickerActions'

export function writeSingleShopOnlyShopPickerRef(state = null, action) {
  switch (action.type) {
    case WRITE_SINGLE_SHOP_PICKER_REF:
      return action.data.ref
    default:
      return state
  }
}