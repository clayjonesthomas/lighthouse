import React, { PropTypes } from 'react';
import LoginModalHandler from './LoginHandler'
import {connect} from 'react-redux'
import {cancelModal} from '../actions/AuthActions'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModalHandler
}

const ModalRoot = ({ modal, onCancel }) => {
  if (!modal) {
    return <span />
  }
  const SpecificModal = MODAL_COMPONENTS[modal]
  return (
    <SpecificModal
        onCancel={() => onCancel()}
      />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => dispatch(cancelModal()),
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRoot)