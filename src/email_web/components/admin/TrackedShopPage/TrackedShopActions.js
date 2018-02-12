import fetch from 'isomorphic-fetch'
import {TRACKED_SHOPS_BACKEND_URL} from '../../../urls'

export const PULL_LIKED_SHOPS_REQUEST = "PULL_LIKED_SHOPS_REQUEST"
export const PULL_LIKED_SHOPS_RETURN = "PULL_LIKED_SHOPS_RETURN"

export const pullLikedShopsRequest = () => {
  return {
    type: PULL_LIKED_SHOPS_REQUEST
  }
}

export const pullLikedShopsReturn = () => {
  return {
    type: PULL_LIKED_SHOPS_RETURN
  }
}

export function pullLikedShops() {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    dispatch(pullLikedShopsRequest())
    return fetch(TRACKED_SHOPS_BACKEND_URL, args)
      .then(response => response.json())
      .then(json => {
        if (json.shops) {
          dispatch(pullLikedShopsReturn(json.shops))
        }
      })
  }
}
