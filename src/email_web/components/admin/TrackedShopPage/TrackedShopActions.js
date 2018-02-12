import fetch from 'isomorphic-fetch'
import {TRACKED_SHOPS_BACKEND_URL, ARCHIVE_POST_BACKEND_URL}
  from '../../../urls'

export const PULL_LIKED_SHOPS_REQUEST = "PULL_LIKED_SHOPS_REQUEST"
export const PULL_LIKED_SHOPS_RETURN = "PULL_LIKED_SHOPS_RETURN"
export const ARCHIVE_POST_REQUEST = "ARCHIVE_POST_REQUEST"
export const ARCHIVE_POST_RETURN = "ARCHIVE_POST_RETURN"

export const archivePostRequest = () => {
  return {
    type: ARCHIVE_POST_REQUEST
  }
}

export const archivePostReturn = (key) => {
  return {
    type: ARCHIVE_POST_RETURN,
    data: key
  }
}

export function archivePost(key) {
  return (dispatch) => {
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        key: key
      })
    }

    dispatch(archivePostRequest())
    return fetch(ARCHIVE_POST_BACKEND_URL, args)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(archivePostReturn(key))
        }
      })
  }
}

export const pullLikedShopsRequest = () => {
  return {
    type: PULL_LIKED_SHOPS_REQUEST
  }
}

export const pullLikedShopsReturn = (shops) => {
  return {
    type: PULL_LIKED_SHOPS_RETURN,
    data: shops
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
