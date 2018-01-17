import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SignUpPage.css"
import "../LandingPage/LandingPage.css"

const SignUpPage = ({
                  shouldDisplay
                }) => (
  <form className={shouldDisplay ? "form-contents" :
    "form-contents form-contents-hidden"}>
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
        />
        <HelpBlock id="store-helper-text">
          We recommend picking 5-6 of your favorite stores and brands to start off.
        </HelpBlock>
        <FormControl
          className="form-box"
          id="email-box"
          type="text"
          // value={this.state.value}
          placeholder="Email"
          // onChange={this.handleChange}
        />
        <FormControl
          className="form-box"
          type="text"
          // value={this.state.value}
          placeholder="Password"
          // onChange={this.handleChange}
        />
      </FormGroup>
      <input
        type="submit"
        value="TRY IT OUT"
        className="submit-button"
        id="form-button"
      />
    </div>
  </form>
)

export default SignUpPage

