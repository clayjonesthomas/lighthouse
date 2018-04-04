import fetch from 'isomorphic-fetch'

import {UPLOAD_ICON_BACKEND_URL} from '../../../urls'

export const GET_UPLOAD_URL_RESPONSE = "GET_UPLOAD_URL_RESPONSE"
export const NEW_SHOP_REQUEST = "NEW_SHOP_REQUEST"
export const NEW_SHOP_RESPONSE = "NEW_SHOP_RESPONSE"

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

export const newShopRequest = () => {
  return {
    type: NEW_SHOP_REQUEST
  }
}

export const newShopResponse = () => {
  return {
    type: NEW_SHOP_RESPONSE
  }
}