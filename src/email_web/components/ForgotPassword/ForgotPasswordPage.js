import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import ForgotPasswordComponent from './ForgotPasswordComponent'
import {emailChange, submitForgotPassword} from './ForgotPasswordActions'
import {FORGOT_PASSWORD_SUCCESS_URL} from '../../urls'

export const FORGOT_PASSWORD_PAGE = 'FORGOT_PASSWORD_PAGE'

class ForgotPasswordPage extends Component {
  render() {
    const {
      emailValue,
      handleEmailChange,
      onSubmitEmail,
      hasAttemptedSubmission,
      invalidEmail
    } = this.props
    return (
      <ForgotPasswordComponent
        emailValue={emailValue}
        handleEmailChange={handleEmailChange}
        onSubmitEmail={onSubmitEmail}
        hasAttemptedSubmission={hasAttemptedSubmission}
        invalidEmail={invalidEmail}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emailValue: state.forgotPassword.emailValue,
    hasAttemptedSubmission: state.forgotPassword.hasAttemptedSubmission,
    invalidEmail: state.forgotPassword.invalidEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange: (e) =>
      dispatch(emailChange(e.target.value)),
    onSubmitEmail: (e) => {
      e.preventDefault()
      dispatch(submitForgotPassword())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage)
