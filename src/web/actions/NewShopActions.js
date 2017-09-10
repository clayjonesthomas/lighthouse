import {NEW_SHOP_URL, ADD_SHOP_ICON} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const NEW_SHOP_REQUEST = 'NEW_SHOP_REQUEST'
export const NEW_SHOP_RESPONSE = 'NEW_SHOP_RESPONSE'
export const ADD_SHOP_ICON_TO_FORM_DATA = 'ADD_SHOP_ICON_TO_FORM_DATA'

export function submitShop() {
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

    return fetch(NEW_SHOP_URL, formArgs)
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
      //   fetch(ADD_SHOP_ICON+`/${json.key}`, iconArgs)
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
    type: NEW_SHOP_REQUEST
  }
}

export const onSubmitResponse = () => {
  return {
    type: NEW_SHOP_RESPONSE
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
      dispatch(addShopIconToFormData(event.currentTarget.result))
    };
    reader.readAsDataURL(icon_file);
  }
}

const addShopIconToFormData = (icon_data) => {
  return {
    type: ADD_SHOP_ICON_TO_FORM_DATA,
    data: {
      icon: icon_data
    }
  }
}
