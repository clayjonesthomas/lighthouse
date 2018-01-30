import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

import "../LogInPage/LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

export function validatePasswords(password,
                                  confirmPassword,
                                  hasAttemptedSubmission) {
  if (hasAttemptedSubmission) {
    if (password !== confirmPassword) {
      return 'error'
    }
  }
  return null
}

export function validatePassword(passwordValue,
                                 hasAttemptedSubmission) {
  if (hasAttemptedSubmission) {
    if (passwordValue.length < 6)
      return 'error'
  }
}

const NewPasswordComponent = ({
                                email,
                                handlePasswordChange,
                                handleConfirmPasswordChange,
                                passwordValue,
                                confirmPasswordValue,
                                onSubmitNewPass,
                                hasAttemptedSubmission,
                                invalidPass
                              }) => (
  <form
    className="auth-form"
    onSubmit={onSubmitNewPass}>
    <div
      className="form-wrapper">
      <h1 className="form-title">
        {
          "Update password for " + email
        }
      </h1>
      <p
        className="helper-text">
        If this is not your email address, please close this
        page and mail&nbsp;
        <a
          href="mailto:info@lightho.us"
          target="_top">
          info@lightho.us
        </a>
        &nbsp;for help.
      </p>
      <FormGroup
        validationState={validatePassword(passwordValue, hasAttemptedSubmission)}
        className="password-box"
      >
        <FormControl
          className="form-box"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        {
          validatePassword(passwordValue, hasAttemptedSubmission) &&
          <p className="password-error">
            Please input a password that is at least 6 characters long.
          </p>
        }
      </FormGroup>
      <FormGroup
        validationState={
          validatePasswords(passwordValue,
            confirmPasswordValue, hasAttemptedSubmission)
        }
      >
        <FormControl
          className="form-box"
          type="password"
          value={confirmPasswordValue}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
        />
        {
          validatePasswords(passwordValue,
            confirmPasswordValue, hasAttemptedSubmission) &&
          <p className="password-error">
            This password doesn't match the other.
            Please give matching passwords.
          </p>
        }
      </FormGroup>
      <input
        type="submit"
        value="UPDATE PASSWORD"
        className="submit-button form-button"
      />
    </div>
  </form>
)

export default NewPasswordComponent
