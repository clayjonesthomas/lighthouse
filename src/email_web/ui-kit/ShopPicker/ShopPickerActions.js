import fetch from 'isomorphic-fetch'

export const WRITE_SINGLE_SHOP_PICKER_REF = 'WRITE_SINGLE_SHOP_PICKER_REF'

export const writeSingleShopPickerRef = (ref) => {
  return {
    type: WRITE_SINGLE_SHOP_PICKER_REF,
    data: {
      ref: ref
    }
  }
}

export function clearWriteSingleShopOnlyShopPicker() {
  return (dispatch, getState) => {
    const state = getState()
    const shopPicker = state.writeSingleShopOnlyShopPickerRef
    if(shopPicker){
      shopPicker.getInstance().clear()
    }
  }
}
