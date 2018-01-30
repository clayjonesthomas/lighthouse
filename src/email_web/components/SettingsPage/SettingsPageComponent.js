import React from 'react'
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'

import "./SettingsPageComponent.css"

export const HIGH_FREQUENCY_EMAIL = 'HIGH_FREQUENCY_EMAIL'
export const MID_FREQUENCY_EMAIL = 'MID_FREQUENCY_EMAIL'
export const UNSUBSCRIBE_EMAIL = 'UNSUBSCRIBE_EMAIL'

const SettingsPageComponent = ({
  selectedShops,
  emailFrequency,
  isSettingsUnchanged,
  displaySpinner,
  showSavedMessage,
  onPickedShopsChange,
  handleEmailFrequencyChange,
  onSubmitSettings
}) => (
  <form id="update-settings-form"
    onSubmit={onSubmitSettings}>
    <h1 id="settings-form-title">
      Settings
    </h1>
    <FormGroup>
      <div className="settings-section">
        <h2 className="section-title">Update Your Shops</h2>
        <ShopPicker
          className="shop-picker-box"
          tabIndex={-1 /*TODO what do here*/}
          isSetupMode={false}
          selectedShops={selectedShops || []}
          onPickedShopsChange={onPickedShopsChange}
        />
      </div>
    </FormGroup>
    <FormGroup
      onClick={handleEmailFrequencyChange /*switch to onChange once this bug is resolved https://github.com/facebook/react/issues/10168*/}>
      <div className="settings-section">
        <h2 className="section-title">Email Preferences</h2>
        <Radio name="emailOptions" value="HIGH_FREQUENCY_EMAIL" checked={emailFrequency===HIGH_FREQUENCY_EMAIL}>High frequency - daily email with all your sales</Radio>
        <Radio name="emailOptions" value="MID_FREQUENCY_EMAIL" checked={emailFrequency===MID_FREQUENCY_EMAIL}>Standard frequency - important sales only</Radio>
        <Radio name="emailOptions" value="UNSUBSCRIBE_EMAIL" checked={emailFrequency===UNSUBSCRIBE_EMAIL}>Unsubscribe me from all emails</Radio>
      </div>
    </FormGroup>
    <input
      type="submit"
      disabled={isSettingsUnchanged}
      value="SAVE CHANGES"
      className="submit-button"
      id="settings-form-button"
    />
    {displaySpinner && 
      <span>Spinner</span>}
    {showSavedMessage && 
      <span>Changes saved!</span>}
  </form>
)

export default SettingsPageComponent
