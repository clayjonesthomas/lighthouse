import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {cancelModal, logInUser, signUpUser} from '../actions/AuthActions'
import {LOGIN_USERNAME, LOGIN_PASSWORD, SIGN_UP_USERNAME, SIGN_UP_PASSWORD_1, SIGN_UP_PASSWORD_2}
  from '../components/modals/LoginModal'

class LoginHandler extends Component {

  render () {
    return (
      <LoginModal
        onLogin={this.props.onLogin}
        onCancel={this.props.onCancel}
        onSignup={this.props.onSignUp}
      />
    )
  }
}

function compileAndLogInUser() {
  return (dispatch, getState) => {
    let state = getState()
    let username = state[LOGIN_USERNAME].value
    let password = state[LOGIN_PASSWORD].value
    dispatch(logInUser(username, password))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pass) => dispatch(logInUser(user, pass)),
    onSignUp: () => dispatch(signUpUser()),
    refFunc: (elemID, ref) => dispatch(refFunc(elemID, ref))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    onCancel: () => ownProps.onCancel()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHandler)