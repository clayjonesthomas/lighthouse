import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import EditShop from '../../features/EditShop/EditShop'
import {onSaveRef} from '../NewPostPage/NewPostActions' //TODO move to utility
import {submitShop} from './NewShopActions'


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNameRef: (ref) => dispatch(onSaveRef(ref, 'shop_name')),
    onSaveWebsiteRef: (ref) => dispatch(onSaveRef(ref, 'shop_website')),
    onSaveIconUrlRef: (ref) => dispatch(onSaveRef(ref, 'icon_url')),
    // onSaveIconRef: (ref) => dispatch(onSaveRef(ref, 'shop_icon')),
    onSubmit: () => dispatch(submitShop()),
    onCancel: () => {dispatch(push('/'))},
    // onIconChange: (ref) => dispatch(onIconChange(ref))
  }
}

const NewShopHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShop)

export default NewShopHandler