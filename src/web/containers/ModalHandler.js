import React, { PropTypes } from 'react';
import LoginModalHandler from './LoginHandler'
import {connect} from 'react-redux'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModalHandler
}

const ModalRoot = ({ modal, modalProps }) => {
  if (!modal) {
    return <span />
  }
  const SpecificModal = MODAL_COMPONENTS[modal]
  return <SpecificModal {...modalProps} />
}

export default connect(
  state => ({modal: state.modal})
)(ModalRoot)