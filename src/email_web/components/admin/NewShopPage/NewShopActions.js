import fetch from 'isomorphic-fetch'

import {NEW_SHOP_BACKEND_URL}
  from '../../../urls'

export const ADMIN_SHOP_TITLE_CHANGE = "ADMIN_SHOP_TITLE_CHANGE"
export const ADMIN_SHOP_SITE_CHANGE = "ADMIN_SHOP_SITE_CHANGE"
export const ADMIN_SHOP_ALT_NAMES_CHANGE = "ADMIN_SHOP_ALT_NAMES_CHANGE"
export const NEW_SHOP_REQUEST = "NEW_SHOP_REQUEST"
export const NEW_SHOP_RESPONSE = "NEW_SHOP_RESPONSE"

export const shopTitleChange = (value) => {
  return {
    type: ADMIN_SHOP_TITLE_CHANGE,
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

export function submitNewShop() {
  return (dispatch, getState) => {
    const state = getState()
    const title = state.newShop.shopTitleValue
    const site = state.newShop.shopSiteValue
    const altNames = state.newShop.shopAltNamesValue

    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        title: title,
        site: site,
        alternateNames: altNames
      })
    }

    dispatch(newShopRequest())
    return fetch(NEW_SHOP_BACKEND_URL, args)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(newShopResponse())
        }
      })
  }
}
