import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SettingsPage.css"

const SettingsPage = ({
  onSaveRadioRef
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
        <Radio name="emailOptions">High frequency - daily email with all your sales</Radio>
        <Radio name="emailOptions" defaultChecked>Standard frequency - important sales only</Radio>
        <Radio name="emailOptions">Unsubscribe me from all emails</Radio>
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
