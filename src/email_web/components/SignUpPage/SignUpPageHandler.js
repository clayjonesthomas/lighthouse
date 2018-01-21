import React, {Component} from 'react'
import {connect} from 'react-redux'

import SignUpPage from './SignUpPage'
import {emailChange, passwordChange} from './SignUpPageActions'

export const SIGN_UP_PAGE = 'SIGN_UP_PAGE'

class SignUpPageHandler extends Component {
  render() {
    const {
      shouldDisplay,
      handleEmailChange,
      handlePasswordChange,
      emailValue,
      passwordValue
    } = this.props
    return (
      <SignUpPage
        shouldDisplay={shouldDisplay}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        emailValue={emailValue}
        passwordValue={passwordValue}

      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shouldDisplay: ownProps.shouldDisplay,
    emailValue: state.signup.email,
    passwordValue: state.signup.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange: (e) => dispatch(emailChange(e.target.value)),
    handlePasswordChange: (e) => dispatch(passwordChange(e.target.value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPageHandler)
