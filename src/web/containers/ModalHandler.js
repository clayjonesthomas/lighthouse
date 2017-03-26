import React, { PropTypes } from 'react';
import LoginModal from '../components/LoginModal'
import {connect} from 'react-redux'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModal
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