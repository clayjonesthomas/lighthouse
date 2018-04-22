import fetch from 'isomorphic-fetch'
import {SEND_SHOP_REQUEST_URL} from '../../urls'

export const WRITE_SINGLE_SHOP_PICKER_REF = 'WRITE_SINGLE_SHOP_PICKER_REF'
export const SHOP_PICKER_TEXT_INPUT = 'SHOP_PICKER_TEXT_INPUT'
export const SEND_REQUEST_EMAIL_REQUEST = 'SEND_REQUEST_EMAIL_REQUEST'
export const SEND_REQUEST_EMAIL_RESPONSE = 'SEND_REQUEST_EMAIL_RESPONSE'

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

export const shopPickerInputChange = (input) => {
  return {
    type: SHOP_PICKER_TEXT_INPUT,
    data: input
  }
}

export const sendShopRequestEmailRequest = () => {
  return {
    type: SEND_REQUEST_EMAIL_REQUEST
  } 
}

export const sendShopRequestEmailResponse = () => {
  return {
    type: SEND_REQUEST_EMAIL_RESPONSE
  }
}

export function sendShopRequestEmail() {
  return (dispatch, getState) => {
    const state = getState()
    const inputText = state.shopPickerInputText
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        inputText: inputText
      })
    }

    dispatch(sendShopRequestEmailRequest())
    return fetch(SEND_SHOP_REQUEST_URL, args)
      .then(response => response.json())
      .then(() => dispatch(sendShopRequestEmailResponse()))
  } 
}
