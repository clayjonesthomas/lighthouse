import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import NewStoreForm from '../components/NewStoreForm'
import {onSaveRef} from '../actions/NewPostActions'
import {submitStore} from '../actions/NewStoreActions'


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNameRef: (ref) => dispatch(onSaveRef(ref, 'store_name')),
    onSaveWebsiteRef: (ref) => dispatch(onSaveRef(ref, 'store_website')),
    // onSaveIconRef: (ref) => dispatch(onSaveRef(ref, 'store_icon')),
    onSubmit: () => dispatch(submitStore()),
    onCancel: () => {
      browserHistory.push('/')
    },
    // onIconChange: (ref) => dispatch(onIconChange(ref))
  }
}

const NewStoreHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStoreForm)

export default NewStoreHandler