import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import NewShopForm from '../components/NewShopForm'
import {onSaveRef} from '../actions/NewPostActions'
import {submitShop} from '../actions/NewShopActions'


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNameRef: (ref) => dispatch(onSaveRef(ref, 'shop_name')),
    onSaveWebsiteRef: (ref) => dispatch(onSaveRef(ref, 'shop_website')),
    // onSaveIconRef: (ref) => dispatch(onSaveRef(ref, 'shop_icon')),
    onSubmit: () => dispatch(submitShop()),
    onCancel: () => {dispatch(push('/'))},
    // onIconChange: (ref) => dispatch(onIconChange(ref))
  }
}

const NewShopHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopForm)

export default NewShopHandler