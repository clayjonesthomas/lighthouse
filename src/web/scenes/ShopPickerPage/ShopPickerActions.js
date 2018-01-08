import {SET_LIKED_SHOPS_URL} from '../../constants/constants'

export const SET_MY_LIKED_SHOPS_REQUEST = 'SET_MY_LIKED_SHOPS_REQUEST'
export const SET_MY_LIKED_SHOPS_RETURN = 'SET_MY_LIKED_SHOPS_RETURN'

export const SetMyLikedShopsRequest = () => {
  return {
    type: SET_MY_LIKED_SHOPS_REQUEST
  }
}

export const SetMyLikedShopsReturn = (selectedShops) => {
  return {
    type: SET_MY_LIKED_SHOPS_RETURN,
    data: {
      selectedShops: selectedShops
    }
  }
}

export function setMyLikedShops(){
  return (dispatch, getState) => {
    const state = getState()
    if(state.form.shops) {
      const shops = state.form.shops.map(shop => {
        return shop.key
      })
      const body = {
        keys: shops
      }
      const args = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body)
      }
      dispatch(SetMyLikedShopsRequest())
      return fetch(SET_LIKED_SHOPS_URL, args)
        .then(response => response.json())
        .then(json => {
          dispatch(SetMyLikedShopsReturn(json))
        })
    }
  }
}
