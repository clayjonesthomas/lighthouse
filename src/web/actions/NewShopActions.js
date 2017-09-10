import {NEW_STORE_URL, ADD_STORE_ICON} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const NEW_STORE_REQUEST = 'NEW_STORE_REQUEST'
export const NEW_STORE_RESPONSE = 'NEW_STORE_RESPONSE'
export const ADD_STORE_ICON_TO_FORM_DATA = 'ADD_STORE_ICON_TO_FORM_DATA'

export function submitStore() {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const name = refs.store_name.value
    const website = refs.store_website.value
    // const icon = refs.icon
    const body = {
      name: name,
      website: website,
    }
    const formArgs = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(body)
    }

    dispatch(onSubmitRequest())

    return fetch(NEW_STORE_URL, formArgs)
      .then(response => response.json())
      .then(json => onSubmitResponse())
      //   json => {
      //   let data = new FormData()
      //   data.append('file',icon)
      //   const iconArgs = {
      //     method: 'POST',
      //     credentials: 'same-origin',
      //     enctype: "multipart/form-data",
      //     body: data
      //   }
      //   fetch(ADD_STORE_ICON+`/${json.key}`, iconArgs)
      //     .then(response => {
      //       response.json()
      //     })
      //     .then(json => {
      //       dispatch(onSubmitResponse(json))
      //     })
      // })

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

// should probably be an on ref thing...
export function onIconChange(file) {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const icon_file = refs.store_icon.files[0]
    let reader = new FileReader();

    reader.onload = function(event) {
      dispatch(addStoreIconToFormData(event.currentTarget.result))
    };
    reader.readAsDataURL(icon_file);
  }
}

const addStoreIconToFormData = (icon_data) => {
  return {
    type: ADD_STORE_ICON_TO_FORM_DATA,
    data: {
      icon: icon_data
    }
  }
}
