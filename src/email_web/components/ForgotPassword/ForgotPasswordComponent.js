import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

import "../LogInPage/LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmail(emailValue,
                              hasAttemptedSubmission) {
  if (hasAttemptedSubmission) {
    if (!emailRegex.test(emailValue)) {
      return 'error'
    }
  }
  return null
}

const ForgotPasswordComponent = ({
                                   emailValue,
                                   handleEmailChange,
                                   onSubmitEmail,
                                   hasAttemptedSubmission
                                 }) => (
  <form
    className="auth-form"
    onSubmit={onSubmitEmail}>
    <div
      className="form-wrapper"
      id="log-in-form-wrapper">
      <h1 className="form-title">
        Forgot your password?
      </h1>
      <p
        className="helper-text"
        id="log-in-helper-text">
        No problem! It happens to everyone. Fill out your email below,
        and if we find a matching account, we'll email you with the next
        step to resetting your password.
      </p>
      <FormGroup
        validationState={
          validateEmail(emailValue, hasAttemptedSubmission)
        }
        className="email-box"
      >
        <FormControl
          className="form-box"
          type="text"
          value={emailValue}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        {
          validateEmail(emailValue, hasAttemptedSubmission) &&
          <p className="email-error">
            Please input a valid email.
          </p>
        }
      </FormGroup>
      <input
        type="submit"
        value="SEND"
        className="submit-button form-button"
      />
    </div>
  </form>
)

export default ForgotPasswordComponent
