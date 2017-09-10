import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import NewShopForm from '../components/NewShopForm'
import {onSaveRef} from '../actions/NewPostActions'
import {submitShop} from '../actions/NewShopActions'


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNameRef: (ref) => dispatch(onSaveRef(ref, 'store_name')),
    onSaveWebsiteRef: (ref) => dispatch(onSaveRef(ref, 'store_website')),
    // onSaveIconRef: (ref) => dispatch(onSaveRef(ref, 'store_icon')),
    onSubmit: () => dispatch(submitShop()),
    onCancel: () => {
      browserHistory.push('/')
    },
    // onIconChange: (ref) => dispatch(onIconChange(ref))
  }
}

const NewShopHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopForm)

export default NewShopHandler