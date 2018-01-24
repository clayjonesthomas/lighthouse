import React, {Component} from 'react'
import {connect} from 'react-redux'

import SignUpPage from './SignUpPage'
import {emailChange, passwordChange, pickedShopsChange,
  submitSignUpForm}
  from './SignUpPageActions'

export const SIGN_UP_PAGE = 'SIGN_UP_PAGE'

class SignUpPageHandler extends Component {
  render() {
    const {
      shouldDisplay,
      handleEmailChange,
      handlePasswordChange,
      emailValue,
      passwordValue,
      onPickedShopsChange,
      onSubmitSignUp,
      selectedShops
    } = this.props
    return (
      <SignUpPage
        shouldDisplay={shouldDisplay}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        emailValue={emailValue}
        passwordValue={passwordValue}
        onPickedShopsChange={onPickedShopsChange}
        onSubmit={onSubmitSignUp}
        selectedShops={selectedShops}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shouldDisplay: ownProps.shouldDisplay,
    emailValue: state.signup.email,
    passwordValue: state.signup.password,
    selectedShops: state.signup.selectedShops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange: (e) => dispatch(emailChange(e.target.value)),
    handlePasswordChange: (e) => dispatch(passwordChange(e.target.value)),
    onPickedShopsChange: (shops) => dispatch(pickedShopsChange(shops)),
    onSubmitSignUp: () => dispatch(submitSignUpForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPageHandler)
