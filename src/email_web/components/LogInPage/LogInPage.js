import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {SIGN_UP_PAGE_URL} from '../../urls'

import LogInPageComponent from './LogInPageComponent'
import {emailChange, passwordChange, submitLogInForm}
  from './LogInPageActions'

export const LOG_IN_PAGE = 'LOG_IN_PAGE'

class LogInPage extends Component {
  render() {
    const {
      handleEmailChange,
      handlePasswordChange,
      emailValue,
      passwordValue,
      onSubmitLogIn,
      hasAttemptedSubmission,
      invalidEmailPass,
      onGoToSignUp
    } = this.props
    return (
      <LogInPageComponent
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        emailValue={emailValue}
        passwordValue={passwordValue}
        onSubmitLogIn={onSubmitLogIn}
        hasAttemptedSubmission={hasAttemptedSubmission}
        invalidEmailPass={invalidEmailPass}
        onGoToSignUp={onGoToSignUp}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emailValue: state.login.email,
    passwordValue: state.login.password,
    hasAttemptedSubmission: state.login.hasAttemptedSubmission,
    invalidEmailPass: state.login.invalidEmailPass
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange: (e) => dispatch(emailChange(e.target.value)),
    handlePasswordChange: (e) => dispatch(passwordChange(e.target.value)),
    onSubmitLogIn: (e) => {
      e.preventDefault()
      dispatch(submitLogInForm())
    },
    onGoToSignUp: () => {dispatch(push(SIGN_UP_PAGE_URL))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInPage)
