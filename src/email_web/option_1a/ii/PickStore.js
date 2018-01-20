import React from 'react'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

import ShopPicker from '../../../web/scenes/ShopPickerPage/ShopPicker'

import "./PickStore.css"
const PickStore = ({
  scroll_pages,
  shops
                   }) => (
  <form className={scroll_pages ? "form-contents_2":
    "form-contents_2 form-contents-hidden_2"}>
    <div className="form-wrapper_2">
      <h1 className="form-title">Sign Up</h1>
      <p className="sign-up-helper-text">
        Already have an account? <a>Sign in</a>
      </p>
      <FormGroup
        controlId="formBasicText"
        // validationState={this.getValidationState()}
      >
        <ShopPicker
          className="shop-picker-box"
        />
        <HelpBlock className="store-helper-text">
          We recommend picking 5-6 of your favorite stores and brands to start off.
        </HelpBlock>
        <FormControl
          className="email-box"
          type="text"
          // value={this.state.value}
          placeholder="Email"
          // onChange={this.handleChange}
        />
        <FormControl
          className="pass-box"
          type="text"
          // value={this.state.value}
          placeholder="Password"
          // onChange={this.handleChange}
        />
      </FormGroup>
      <input type="submit" value="TRY IT OUT" className="try-it-button_2 submit-button_2"/>
    </div>
  </form>
)

export default PickStore

