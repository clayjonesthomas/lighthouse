// this should be broken out/refactored into difference reducers for
// different forms
import {SAVE_NEW_POST_FORM_REF, UPDATE_FORM_SHOPS,ADD_POST_FAILURE,
  ADD_POST_RETURN, VALIDATION_ERROR}
  from 'scenes/NewPostPage/NewPostActions'
import {ADD_SHOP_FINDER_REF}
  from 'scenes/MyShopsPage/MyShopsPageActions'
import {LOGIN_RESPONSE_FAILED, SIGN_UP_RESPONSE_FAILED, CLEAR_ERROR_MESSAGE,
  DUPLICATE_USERNAME_ERROR, AUTHENTICATION_ERROR}
  from 'scenes/modals/AuthActions'

export function formRefs(state = {}, action) {
  switch(action.type) {
    case SAVE_NEW_POST_FORM_REF:
      let ref_obj = {}
      ref_obj[action.data.type] = action.data.ref
      return Object.assign({}, state, ref_obj)
    case ADD_SHOP_FINDER_REF:
      return Object.assign({}, state, {
          shopFinder: action.data.ref
        })
    // icons currently not implemented
    // case ADD_SHOP_ICON_TO_FORM_DATA:
    //   return Object.assign({}, state, {
    //       icon: action.data.icon
    //     })
    default:
      return state
  }
}

export function form(state = {}, action) {
  switch(action.type) {
    case UPDATE_FORM_SHOPS:
      return {
          shops: action.data.shops
        }
    default:
      return state
  }
}

export function serverMessageArray(state = [], action) {
  let serverMessageArray = []
  switch(action.type) {
    case SIGN_UP_RESPONSE_FAILED:
      switch (action.data.error.error) {
        case VALIDATION_ERROR:
          if (!action.data.error.isUsernamePresent) {
            serverMessageArray.push("you must enter a username")
          }
          if (!action.data.error.isEmailPresent) {
            serverMessageArray.push("you must enter an email")
          } else if (!action.data.error.isEmailValid) {
            serverMessageArray.push("you must enter a valid email")
          }
          if (!action.data.error.isPasswordPresent) {
            serverMessageArray.push("you must enter a password")
          }
          break
        case DUPLICATE_USERNAME_ERROR:
          serverMessageArray.push("the username is already taken," +
            " please select another")
          break
      }
      return serverMessageArray
    case LOGIN_RESPONSE_FAILED:
      switch (action.data.error.error) {
        case VALIDATION_ERROR:
          if (!action.data.error.isUsernamePresent) {
            serverMessageArray.push("you must enter a username")
          }
          if (!action.data.error.isPasswordPresent) {
            serverMessageArray.push("you must enter a password")
          }
          break
        case AUTHENTICATION_ERROR:
          serverMessageArray.push("The username or password was " +
            "entered incorrectly.")
          break
      }
      return serverMessageArray
    case CLEAR_ERROR_MESSAGE:
      return []
    case ADD_POST_RETURN:
      if (action.data.error) {
        switch (action.data.error) {
          case VALIDATION_ERROR:
          default:
            if (action.data.isShopsValid) {
              serverMessageArray.push("please make sure " +
                "you have added at least one valid shop")
            }
            if (action.data.isTitleValid) {
              serverMessageArray.push("please make sure " +
                "you have added a title")
            }
        }
      }
      return serverMessageArray
    case ADD_POST_FAILURE:
      if (action.data.messages.noShopsError) {
        serverMessageArray.push("You need to add at least one shop")
      }
      if (action.data.messages.noTitleError) {
        serverMessageArray.push("You need to give the post a descriptive title")
      }
      return serverMessageArray
    default:
      return state
  }
}