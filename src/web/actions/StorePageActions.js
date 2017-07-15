import fetch from 'isomorphic-fetch'
import {STORE_URL} from '../constants/constants'

export const REQUEST_STORE = "REQUEST_STORE"
export const REQUEST_STORE_RETURN = "REQUEST_STORE_RETURN"

export const requestStore = () => {
  return {
    type: REQUEST_STORE
  }
}

export const responseStore = (store) => {
  return {
    type: REQUEST_STORE_RETURN,
    data: {
      store: store
    }
  }
}

export function pullStore(url_key) {
  const args = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return dispatch => {
    dispatch(requestStore())
    return fetch(STORE_URL+`/${url_key}`, args)
      .then(response => response.json())
      .then(json => dispatch(responseStore(json.store)))
  }
}
