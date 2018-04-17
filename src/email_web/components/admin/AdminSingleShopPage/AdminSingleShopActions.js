import fetch from 'isomorphic-fetch'

import {UPLOAD_ICON_BACKEND_URL} from '../../../urls'

export const GET_UPLOAD_URL_RESPONSE = "GET_UPLOAD_URL_RESPONSE"
export const ADMIN_SHOP_NAME_CHANGE = "ADMIN_SHOP_NAME_CHANGE"
export const ADMIN_SHOP_SITE_CHANGE = "ADMIN_SHOP_SITE_CHANGE"
export const ADMIN_SHOP_ALT_NAMES_CHANGE = "ADMIN_SHOP_ALT_NAMES_CHANGE"
export const EDIT_SHOP_PICKER_CHANGE = "EDIT_SHOP_PICKER_CHANGE"

export const getUploadUrlResponse = (url) => {
  return {
    type: GET_UPLOAD_URL_RESPONSE,
    data: url
  }
}

export function getUploadUrl() {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    return fetch(UPLOAD_ICON_BACKEND_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(getUploadUrlResponse(json.url))
      })
  }
}

export function editShopPickerChange(shops) {
  return {
    type: EDIT_SHOP_PICKER_CHANGE,
    data: shops[0]
  }
}

export const shopNameChange = (value) => {
  return {
    type: ADMIN_SHOP_NAME_CHANGE,
    data: value
  }
}

export const shopAltNamesChange = (value) => {
  return {
    type: ADMIN_SHOP_ALT_NAMES_CHANGE,
    data: value
  }
}

export const shopSiteChange = (value) => {
  return {
    type: ADMIN_SHOP_SITE_CHANGE,
    data: value
  }
}