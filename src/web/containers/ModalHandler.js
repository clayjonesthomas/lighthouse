import React from 'react'
import LoginModalHandler from './LoginHandler'
import SignUpHandler from './SignUpHandler'
import InfoHandler from './InfoHandler'
import {connect} from 'react-redux'
import {cancelModal} from '../actions/AuthActions'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModalHandler,
  'SIGN_UP': SignUpHandler,
  'INFO': InfoHandler
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