import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewPasswordComponent from './NewPasswordComponent'
import {passwordChange, confirmPasswordChange, submitNewPass}
  from './NewPasswordActions'

export const NEW_PASSWORD_PAGE = 'NEW_PASSWORD_PAGE'

class NewPasswordPage extends Component {
  render() {
    const {
      email,
      handlePasswordChange,
      handleConfirmPasswordChange,
      passwordValue,
      confirmPasswordValue,
      onSubmitNewPass,
      hasAttemptedSubmission,
      invalidPass
    } = this.props
    return (
      <NewPasswordComponent
        email={email}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        passwordValue={passwordValue}
        confirmPasswordValue={confirmPasswordValue}
        onSubmitNewPass={onSubmitNewPass}
        hasAttemptedSubmission={hasAttemptedSubmission}
        invalidPass={invalidPass}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: ownProps.email,
    passwordValue: state.newPass.password,
    confirmPasswordValue: state.newPass.confirmPassword,
    hasAttemptedSubmission: state.newPass.hasAttemptedSubmission,
    invalidPass: state.newPass.invalidPass
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePasswordChange: (e) =>
      dispatch(passwordChange(e.target.value)),
    handleConfirmPasswordChange: (e) =>
      dispatch(confirmPasswordChange(e.target.value)),
    onSubmitNewPass: (e) => {
      e.preventDefault()
      dispatch(submitNewPass(ownProps.email, ownProps.signupKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPasswordPage)
