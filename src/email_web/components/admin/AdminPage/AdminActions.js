import fetch from 'isomorphic-fetch'

import {NEW_POST_BACKEND_URL}
  from '../../../urls'

export const ADMIN_POST_TITLE_CHANGE = "ADMIN_POST_TITLE_CHANGE"
export const ADMIN_PICKED_SHOPS_CHANGE = "ADMIN_PICKED_SHOPS_CHANGE"
export const ADMIN_IS_IMPORTANT_CHANGE = "ADMIN_IS_IMPORTANT_CHANGE"
export const ADMIN_CUSTOM_SALE_LINK_CHANGE = "ADMIN_CUSTOM_SALE_LINK_CHANGE"
export const NEW_POST_REQUEST = "NEW_POST_REQUEST"
export const NEW_POST_RESPONSE = "NEW_POST_RESPONSE"

export const postTitleChange = (value) => {
  return {
    type: ADMIN_POST_TITLE_CHANGE,
    data: value
  }
}

export const pickedShopsChange = (shops) => {
  return {
    type: ADMIN_PICKED_SHOPS_CHANGE,
    data: shops
  }
}

export const isImportantChange = () => {
  return {
    type: ADMIN_IS_IMPORTANT_CHANGE
  }
}

export const customSaleLinkChange = (value) => {
  return {
    type: ADMIN_CUSTOM_SALE_LINK_CHANGE,
    data: value
  }
}

export const newPostRequest = () => {
  return {
    type: NEW_POST_REQUEST
  }
}

export const newPostResponse = () => {
  return {
    type: NEW_POST_RESPONSE
  }
}

export function submitNewPost() {
  return (dispatch, getState) => {
    const state = getState()
    const title = state.admin.postTitleValue
    const selectedShops = state.admin.selectedShops
    const isImportant = state.admin.isImportant
    const customSaleLink = state.admin.customSaleLinkValue

    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        title: title,
        selectedShops: selectedShops,
        isImportant: isImportant,
        customSaleLink: customSaleLink
      })
    }

    dispatch(newPostRequest())
    return fetch(NEW_POST_BACKEND_URL, args)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(newPostResponse())
        }
      })
  }
}
