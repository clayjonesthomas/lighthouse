import React from 'react'
import Logo from '../../../web/ui-kit/Logo'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

import "./PickStore.css"
const PickStore = ({
  scroll_pages
                   }) => (
  <form className={scroll_pages ? "form-contents":
    "form-contents form-contents-hidden"}>
    <div className="form-wrapper">
      <h1 className="form-title">Sign Up</h1>
      <p className="sign-up-helper-text">
        Already have an account? <a>Sign in</a>
      </p>
      <FormGroup
        controlId="formBasicText"
        // validationState={this.getValidationState()}
      >
        {/*<ControlLabel>Working example with validation</ControlLabel>*/}
        <FormControl
          className="text-box"
          type="text"
          // value={this.state.value}
          placeholder="Email"
          // onChange={this.handleChange}
        />
        <FormControl
          className="text-box"
          type="text"
          // value={this.state.value}
          placeholder="Stores"
          // onChange={this.handleChange}
        />
        <FormControl
          className="text-box"
          type="text"
          // value={this.state.value}
          placeholder="Password"
          // onChange={this.handleChange}
        />
        <HelpBlock className="sign-up-helper-text">
          Tip: use a password that is at least 8 characters in length
        </HelpBlock>
      </FormGroup>
      <input type="submit" value="TRY IT OUT" className="try-it-button submit-button"/>
    </div>
  </form>
)

export default PickStore

