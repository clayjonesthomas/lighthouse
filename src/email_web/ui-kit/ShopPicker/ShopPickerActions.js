import fetch from 'isomorphic-fetch'

export const WRITE_SINGLE_SHOP_PICKER_REF = 'WRITE_SINGLE_SHOP_PICKER_REF'
export const SHOP_PICKER_TEXT_INPUT = 'SHOP_PICKER_TEXT_INPUT'

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

export function shopPickerInputChange(input) {
  return {
    type: SHOP_PICKER_TEXT_INPUT,
    data: input
  }
}

export function sendShopRequestEmail() {
  console.log("SEND SHOP REQUEST EMAIL")
  return (dispatch, getState) => {
    const state = getState()
    console.log(state)
  }
}
