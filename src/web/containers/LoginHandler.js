import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {cancelModal, authorizeUser, showSignUp} from '../actions/AuthActions'

class LoginHandler extends Component {

  render () {
    return (
      <LoginModal
        onSubmit={this.props.onSubmitAuthentication}
        onCancel={this.props.onCancel}
        onSignup={this.props.onSignUp}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitAuthentication: (user, pass) => {
      dispatch(authorizeUser(user, pass))
    },
    onCancel: () => {
      dispatch(cancelModal())
    },
    onSignUp: () => {
      dispatch(showSignUp())
    }
  }
}

const mapStateToProps = (state) => {
  return {modalState: state.modalState}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHandler)