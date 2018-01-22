import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SignUpPage.css"
import "../LandingPage/LandingPage.css"

const SignUpPage = ({
                  shouldDisplay
                }) => (
  <form id="sign-up-form">
    <div id="form-wrapper">
      <h1 id="form-title">
        Sign Up
      </h1>
      <p id="sign-up-helper-text">
        Already have an account? <a>Sign in</a>
      </p>
      <FormGroup
        // validationState={this.getValidationState()}
      >
        <ShopPicker
          className="shop-picker-box"
          tabIndex={shouldDisplay ? 0 : -1}
          isSetupMode={true}
        />
        <HelpBlock id="store-helper-text">
          We recommend picking 5-6 of your favorite stores and brands to start off.
        </HelpBlock>
        <FormControl
          tabIndex={shouldDisplay ? 0 : -1}
          className="form-box"
          id="email-box"
          type="text"
          // value={this.state.value}
          placeholder="Email"
          // onChange={this.handleChange}
        />
        <FormControl
          tabIndex={shouldDisplay ? 0 : -1}
          className="form-box"
          type="text"
          // value={this.state.value}
          placeholder="Password"
          // onChange={this.handleChange}
        />
      </FormGroup>
      <input
        tabIndex={shouldDisplay ? 0 : -1}
        type="submit"
        value="TRY IT OUT"
        className="submit-button"
        id="form-button"
      />
    </div>
  </form>
)

export default SignUpPage

