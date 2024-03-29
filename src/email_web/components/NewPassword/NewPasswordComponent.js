import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

import "../LogInPage/LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

import "./NewPasswordComponent.css"
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
                                invalidPass,
                                invalidEmail,
                                invalidToken,
                                goToForgotPassword
                              }) => (
  <form
    className="auth-form"
    onSubmit={onSubmitNewPass}>
    <div
      id="update-password-form"
      className="form-wrapper">
      <h1 className="form-title">Update password for</h1>
      <p id="email-title">{email}</p>
      <p
        className="helper-text">
        If this is not your email address, please mail&nbsp;
        <a
          href="mailto:info@lightho.us"
          target="_top">
          info@lightho.us
        </a>
        &nbsp;for help.
      </p>
      {
        (invalidToken || invalidEmail) &&
        <div
          className="new-pass-server-error"
        >
          The link you are using is invalid. You may have waited too long
          to reset your password or used a reset link that has already been used.
          Please go to&nbsp;
          <a
            onClick={goToForgotPassword}
            tabIndex="-1">
            Forgot Password
          </a>
          &nbsp;and try again.
        </div>
      }
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
