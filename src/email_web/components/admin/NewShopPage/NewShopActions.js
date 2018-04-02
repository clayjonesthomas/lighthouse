import fetch from 'isomorphic-fetch'

import {NEW_SHOP_BACKEND_URL, UPLOAD_ICON_BACKEND_URL}
  from '../../../urls'

// export const ADMIN_SHOP_NAME_CHANGE = "ADMIN_SHOP_NAME_CHANGE"
// export const ADMIN_SHOP_SITE_CHANGE = "ADMIN_SHOP_SITE_CHANGE"
// export const ADMIN_SHOP_ALT_NAMES_CHANGE = "ADMIN_SHOP_ALT_NAMES_CHANGE"
export const GET_UPLOAD_URL_RESPONSE = "GET_UPLOAD_URL_RESPONSE"
export const NEW_SHOP_REQUEST = "NEW_SHOP_REQUEST"
export const NEW_SHOP_RESPONSE = "NEW_SHOP_RESPONSE"

// export const shopNameChange = (value) => {
//   return {
//     type: ADMIN_SHOP_NAME_CHANGE,
//     data: value
//   }
// }

// export const shopAltNamesChange = (value) => {
//   return {
//     type: ADMIN_SHOP_ALT_NAMES_CHANGE,
//     data: value
//   }
// }

// export const shopSiteChange = (value) => {
//   return {
//     type: ADMIN_SHOP_SITE_CHANGE,
//     data: value
//   }
// }

// export const shopIconImageChange = (value) => {
//   return {
//     type: ADMIN_SHOP_ICON_IMAGE_CHANGE,
//     data: value
//   }
// }

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

// export function submitNewShop() {
//   return (dispatch, getState) => {
//     const state = getState()
//     const name = state.newShop.shopNameValue
//     const site = state.newShop.shopSiteValue
//     const altNames = state.newShop.shopAltNamesValue

//     const args = {
//       method: 'POST',
//       credentials: 'same-origin',
//       body: JSON.stringify({
//         name: name,
//         site: site,
//         alternateNames: altNames
//       })
//     }

//     dispatch(newShopRequest())
//     return fetch(NEW_SHOP_BACKEND_URL, args)
//       .then(response => response.json())
//       .then(json => {
//         if (json.success) {
//           dispatch(newShopResponse())
//         }
//       })
//   }
// }
