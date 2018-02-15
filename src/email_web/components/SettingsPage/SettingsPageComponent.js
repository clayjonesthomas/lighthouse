import React from 'react'
import {FormGroup} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'
import Spinner from '../../ui-kit/Spinner'
import XButton from '../../ui-kit/XButton'
import {cornflowerLilac} from '../../ui-kit/colors'

import "./SettingsPageComponent.css"

export const HIGH_FREQUENCY_EMAIL = 'HIGH_FREQUENCY_EMAIL'
export const MID_FREQUENCY_EMAIL = 'MID_FREQUENCY_EMAIL'
export const UNSUBSCRIBE_EMAIL = 'UNSUBSCRIBE_EMAIL'

const SettingsPageComponent = ({
                                 showNotification,
                                 closeNotification,
                                 selectedShops,
                                 emailFrequency,
                                 isSettingsUnchanged,
                                 displaySpinner,
                                 showSavedMessage,
                                 onPickedShopsChange,
                                 handleEmailFrequencyChange,
                                 onSubmitSettings,
                                 isVerified,
                                 onClickResendVerification,
                                 displayResentMessage
                               }) => (
  <form id="update-settings-form"
        onSubmit={onSubmitSettings}>
    <h1 id="settings-form-title" className="settings-section">
      Settings
    </h1>
    {!isVerified && !displayResentMessage &&
    <div
      id="need-verification-container"
      className="settings-section"
      style={showNotification ? {} : {"display": "none"}}
    >
      <XButton
        color={cornflowerLilac}
        size={.3}
        className="need-verification-x-button"
        onClick={closeNotification}
      />
      <p>Your account is not verified. Please verify your account by
        clicking the link in your welcome email.&nbsp;
        <span
          id="resend-verification-link"
          onClick={onClickResendVerification}>Resend verification
        </span>
      </p>
    </div>
    }
    {!isVerified && displayResentMessage &&
    <div
      id="need-verification-container"
      className="settings-section"
      style={showNotification ? {} : {"display": "none"}}
    >
      <XButton
        color={cornflowerLilac}
        size={.3}
        className="need-verification-x-button"
        onClick={closeNotification}
      />
      <p>
        Sent! Check your inbox for your verification link.
      </p>
    </div>
    }
    <FormGroup>
      <div className="settings-section">
        <h2 className="section-title">Update Your Shops</h2>
        <ShopPicker
          className="settings-shop-picker-box shop-picker-box"
          isSetupMode={false}
          selectedShops={selectedShops}
          onPickedShopsChange={onPickedShopsChange}
        />
      </div>
    </FormGroup>
    <FormGroup
      onChange={handleEmailFrequencyChange}>
      <div className="settings-section">
        <h2 className="section-title">Email Preferences</h2>
        <Radio
          name="emailOptions"
          value="HIGH_FREQUENCY_EMAIL"
          checked={emailFrequency === HIGH_FREQUENCY_EMAIL}>
          High frequency - daily email with all your sales
        </Radio>
        <Radio
          name="emailOptions"
          value="MID_FREQUENCY_EMAIL"
          checked={emailFrequency === MID_FREQUENCY_EMAIL}>
          Standard frequency - important sales only
        </Radio>
        <Radio
          name="emailOptions"
          value="UNSUBSCRIBE_EMAIL"
          checked={emailFrequency === UNSUBSCRIBE_EMAIL}>
          Unsubscribe me from all emails
        </Radio>
      </div>
    </FormGroup>
    <div>
      <input
        type="submit"
        disabled={isSettingsUnchanged && !displaySpinner}
        value="SAVE CHANGES"
        className="submit-button"
        id="settings-form-button"
      />
      {displaySpinner &&
      <div id="settings-form-spinner"><Spinner/></div>}
      {showSavedMessage &&
      <div id="settings-form-saved-message">Changes saved!</div>}
    </div>
  </form>
)

export default SettingsPageComponent
