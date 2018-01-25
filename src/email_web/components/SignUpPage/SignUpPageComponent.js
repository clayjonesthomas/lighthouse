import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validateEmail(emailValue, hasAttemptedSubmission) {
  if (hasAttemptedSubmission)
    if (!emailRegex.test(emailValue))
      return 'error'
  return null
}

function validatePassword(passwordValue, hasAttemptedSubmission) {
  if (hasAttemptedSubmission)
    if (passwordValue.length < 6)
      return 'error'
  return null
}

const SignUpPageComponent = ({
                               shouldDisplay,
                               handleEmailChange,
                               handlePasswordChange,
                               emailValue,
                               passwordValue,
                               onPickedShopsChange,
                               onSubmitSignUp,
                               selectedShops,
                               hasAttemptedSubmission
                             }) => (
  <form
    id="sign-up-form"
    className="auth-form"
    onSubmit={onSubmitSignUp}>
    <div className="form-wrapper">
      <h1 className="form-title">
        Sign Up
      </h1>
      <p className="helper-text">
        Already have an account? <a>Sign in</a>
      </p>
      <ShopPicker
        className="shop-picker-box"
        tabIndex={shouldDisplay ? 0 : -1}
        isSetupMode={true}
        selectedShops={selectedShops || []}
        onPickedShopsChange={onPickedShopsChange}
      />
      <HelpBlock
        className="helper-text"
        id="store-helper-text">
        We recommend picking 5-6 of your favorite stores and brands to start off.
      </HelpBlock>
      <FormGroup
        validationState={
          validateEmail(emailValue, hasAttemptedSubmission)
        }
        className="email-box"
      >
        <FormControl
          tabIndex={shouldDisplay ? 0 : -1}
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
      <FormGroup
        validationState={
          validatePassword(passwordValue, hasAttemptedSubmission)
        }
      >
        <FormControl
          tabIndex={shouldDisplay ? 0 : -1}
          className="form-box"
          type="text"
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <p className="password-error">
          Your password must be at least 6 characters long.
        </p>
      </FormGroup>
      <input
        tabIndex={shouldDisplay ? 0 : -1}
        type="submit"
        value="TRY IT OUT"
        className="submit-button form-button"
      />
    </div>
  </form>
)

export default SignUpPageComponent
