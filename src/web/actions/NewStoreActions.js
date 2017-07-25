import {NEW_STORE_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const NEW_STORE_REQUEST = 'NEW_STORE_REQUEST'
export const NEW_STORE_RESPONSE = 'NEW_STORE_RESPONSE'

export function onSubmit() {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const name = refs.store_name.value
    const website = refs.store_website.value
    const icon = refs.store_icon.value
    const body = {
      name: name,
      website: website,
      icon: icon
    }
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(body)
    }
    dispatch(onSubmitRequest())
    return fetch(NEW_STORE_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(onSubmitResponse(json))
      })
  }
}

export const onSubmitRequest = () => {
  return {
    type: NEW_STORE_REQUEST
  }
}

export const onSubmitResponse = () => {
  return {
    type: NEW_STORE_RESPONSE
  }
}
