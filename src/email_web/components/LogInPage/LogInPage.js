import React, {Component} from 'react'
import {connect} from 'react-redux'

import LogInPageComponent from './LogInPageComponent'
import {emailChange, passwordChange, pickedShopsChange,
  submitSignUpForm, attemptSignUp}
  from './LogInPageActions'

export const LOG_IN_PAGE = 'LOG_IN_PAGE'

class LogInPage extends Component {
  render() {
    const {
      shouldDisplay,
      handleEmailChange,
      handlePasswordChange,
      emailValue,
      passwordValue,
      onPickedShopsChange,
      onSubmitSignUp,
      selectedShops,
      hasAttemptedSubmission,
      invalidEmailFromServer
    } = this.props
    return (
      <LogInPageComponent
        shouldDisplay={shouldDisplay}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        emailValue={emailValue}
        passwordValue={passwordValue}
        onPickedShopsChange={onPickedShopsChange}
        onSubmitSignUp={onSubmitSignUp}
        selectedShops={selectedShops}
        hasAttemptedSubmission={hasAttemptedSubmission}
        invalidEmailFromServer={invalidEmailFromServer}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shouldDisplay: ownProps.shouldDisplay,
    emailValue: state.signup.email,
    passwordValue: state.signup.password,
    selectedShops: state.signup.selectedShops,
    hasAttemptedSubmission: state.signup.hasAttemptedSubmission,
    invalidEmailFromServer: state.signup.invalidEmailFromServer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange: (e) => dispatch(emailChange(e.target.value)),
    handlePasswordChange: (e) => dispatch(passwordChange(e.target.value)),
    onPickedShopsChange: (shops) => dispatch(pickedShopsChange(shops)),
    onSubmitSignUp: (e) => {
      e.preventDefault()
      dispatch(submitSignUpForm())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInPage)
