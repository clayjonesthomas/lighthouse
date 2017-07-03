import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {cancelModal, logInUser, signUpUser} from '../actions/AuthActions'

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

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pass) => dispatch(logInUser(user, pass)),
    onSignUp: () => dispatch(signUpUser())
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