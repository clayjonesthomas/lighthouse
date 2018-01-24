import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'
import {Checkbox} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SettingsPage.css"

const SettingsPage = ({
  onSaveCheckboxRef
}) => (
  <form id="update-settings-form">
    <h1 id="form-title">
      Settings
    </h1>
    <FormGroup>
      <div className="settings-section">
        <h2 className="section-title">Update Your Shops</h2>
        <ShopPicker
          className="shop-picker-box"
          isSetupMode={false}
        />
      </div>
    </FormGroup>
    <hr className="settings-section-break"/>
    <FormGroup>
      <div className="settings-section">
        <h2 className="section-title">Email Preferences</h2>
        <Checkbox 
          inputRef={ref => onSaveCheckboxRef(ref)}>
          Unsubscribe me from all lightho.us emails
        </Checkbox>
      </div>
    </FormGroup>
    <hr className="settings-section-break"/>
    <input
      type="submit"
      value="SAVE CHANGES"
      className="submit-button"
      id="settings-form-button"
    />
  </form>
)

export default SettingsPage
