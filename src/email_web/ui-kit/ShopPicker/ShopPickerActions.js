import fetch from 'isomorphic-fetch'

export const ADD_SHOP_PICKER_REF = 'ADD_SHOP_PICKER_REF'

export const addShopPickerRef = (ref) => {
  return {
    type: ADD_SHOP_PICKER_REF,
    data: {
      ref: ref
    }
  }
}

export function clearAddOnlyShopPicker() {
  return (dispatch, getState) => {
    const state = getState()
    const shopPicker = state.addOnlyShopPickerRef
    if(shopPicker){
      shopPicker.getInstance().clear()
    }
  }
}