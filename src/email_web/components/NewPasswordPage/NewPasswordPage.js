import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import LogInPageComponent from './NewPasswordComponent'
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
      <LogInPageComponent
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
    email: ownProps.params.email,
    passwordValue: state.newPass.password,
    confirmPasswordValue: state.newPass.password,
    hasAttemptedSubmission: state.newPass.hasAttemptedSubmission,
    invalidPass: state.newPass.invalidPass
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePasswordChange: (e) =>
      dispatch(passwordChange(e.target.value)),
    handleConfirmPasswordChange: (e) =>
      dispatch(confirmPasswordChange(e.target.value)),
    onSubmitNewPass: (e) => {
      e.preventDefault()
      dispatch(submitNewPass())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPasswordPage)
