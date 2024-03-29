import React from 'react'
import {FormGroup} from 'react-bootstrap'
import {Radio} from 'react-bootstrap'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

import ShopPicker from '../../ui-kit/ShopPicker/ShopPicker'
import Spinner from '../../ui-kit/Spinner'
import XButton from '../../ui-kit/XButton'
import InfoBox from '../../ui-kit/InfoBox'

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
                                 writeSingleShopOnlyOnPickedShopsChange,
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
      className="verification-container settings-section"
      style={showNotification ? {} : {"display": "none"}}
    >
      <XButton
        color={cornflowerLilac}
        size={.3}
        className="verification-x-button"
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
      id="sent-verification-container"
      className="verification-container settings-section"
      style={showNotification ? {} : {"display": "none"}}
    >
      <XButton
        color={"#40a53a"}
        size={.3}
        className="verification-x-button"
        onClick={closeNotification}
      />
      <p>
        Sent! Check your inbox for the verification link.
      </p>
    </div>
    }
    <FormGroup>
      <div className="settings-section">
        <h2 className="section-title">Update Your Shops</h2>
        {selectedShops.length > 0 &&
          <ShopPicker
            className="settings-shop-picker-box shop-picker-box"
            isWriteSingleShopOnly={false}
            selectedShops={selectedShops}
            onPickedShopsChange={onPickedShopsChange}
            isReadOnly={true}
          />
        }
        <ShopPicker
          className="settings-shop-picker-box shop-picker-box"
          isWriteSingleShopOnly={true}
          selectedShops={selectedShops}
          onPickedShopsChange={onPickedShopsChange}
          writeSingleShopOnlyOnPickedShopsChange={writeSingleShopOnlyOnPickedShopsChange}
          isReadOnly={false}
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
          <Tooltip
            placement="right"
            trigger={['hover', 'click']}
            overlay={
              <span>
                Important sales are unusually good sales for the store.
                If a store almost never runs sales, we'll tell you
                every time they have one, but if a store always
                seems to have 20% off something, we'll only tell
                you about that 50% off sale that happens once
                every couple months.
              </span>
            }>
            <span className="info-box">
              <InfoBox/>
            </span>
          </Tooltip>
        </Radio>
        <Radio
          name="emailOptions"
          value="UNSUBSCRIBE_EMAIL"
          checked={emailFrequency === UNSUBSCRIBE_EMAIL}>
          Unsubscribe me from all emails
        </Radio>
      </div>
    </FormGroup>
    <div id="settings-submit-button-container">
      <input
        type="submit"
        disabled={isSettingsUnchanged && !displaySpinner}
        value="SAVE CHANGES"
        className="submit-button"
        id="settings-form-button"
      />
      {displaySpinner &&
      <div id="settings-form-spinner"><Spinner colorHex={"#aec7ea"}/></div>}
      {showSavedMessage &&
      <div id="settings-form-saved-message">Changes saved!</div>}
    </div>
  </form>
)

export default SettingsPageComponent
