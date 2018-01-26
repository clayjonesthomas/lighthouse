import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

import "./LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validateEmail(emailValue, hasAttemptedSubmission) {
  if (hasAttemptedSubmission) {
    if (!emailRegex.test(emailValue)) {
      return 'error'
    }
  }
  return null
}

const LogInPageComponent = ({
                              handleEmailChange,
                              handlePasswordChange,
                              emailValue,
                              passwordValue,
                              onSubmitLogIn,
                              hasAttemptedSubmission,
                              invalidEmailPass,
                              onGoToSignUp
                            }) => (
  <form
    className="auth-form"
    onSubmit={onSubmitLogIn}>
    <div
      className="form-wrapper"
      id="log-in-form-wrapper">
      <h1 className="form-title">
        Log In
      </h1>
      <p
        className="helper-text"
        id="log-in-helper-text">
        Don't have an account? <a onClick={onGoToSignUp}>Sign Up</a>
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
        <p className="email-error">
          Please input a valid email.
        </p>
      </FormGroup>
      <FormGroup>
        <FormControl
          className="form-box"
          type="text"
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </FormGroup>
      <input
        type="submit"
        value="LOG IN"
        className="submit-button form-button"
      />
    </div>
  </form>
)

export default LogInPageComponent
