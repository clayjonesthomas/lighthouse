import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import _ from 'underscore'

import {emailFrequencyChange, pickedShopsChange, 
  resendVerificationEmail, submitSettingsForm}
  from './SettingsPageActions'
import {pullUserData} from '../../services/UserActions'
import SettingsPageComponent from './SettingsPageComponent'
import Spinner from '../../ui-kit/Spinner'

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {

  componentDidMount() {
    this.props.getUserData()
  }

  render() {
    const {
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
      displayResentMessage,
      isLoadingUserData
    } = this.props
    return (
      <div id="main-page-container">
        {isLoadingUserData ? 
            <form id="update-settings-form">
              <h1 id="settings-form-title" className="settings-section">
                Settings
              </h1>
              <div id="settings-loading-spinner">
                <Spinner colorHex={"#aec7ea"}/>
              </div>
            </form>
          :
          <SettingsPageComponent
            selectedShops={selectedShops}
            emailFrequency={emailFrequency}
            isSettingsUnchanged={isSettingsUnchanged}
            displaySpinner={displaySpinner}
            showSavedMessage={showSavedMessage}
            onPickedShopsChange={onPickedShopsChange}
            handleEmailFrequencyChange={handleEmailFrequencyChange}
            onSubmitSettings={onSubmitSettings}
            isVerified={isVerified}
            onClickResendVerification={onClickResendVerification}
            displayResentMessage={displayResentMessage}
          />
        }   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedShops: state.settings.selectedShops,
    emailFrequency: state.settings.emailFrequency,
    isSettingsUnchanged: 
      state.user.myEmailFrequency === state.settings.emailFrequency &&
        _.isEqual(state.user.myShops, state.settings.selectedShops),
    displaySpinner: state.settings.submitSpinner || !state.settings.spinnerComplete,
    showSavedMessage: state.settings.showSavedMessage && state.settings.spinnerComplete,
    isVerified: state.user.isVerified,
    isLoadingUserData: state.user.isLoadingUserData,
    displayResentMessage: state.settings.showResentMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(pullUserData()),
    onPickedShopsChange: (shops) => dispatch(pickedShopsChange(shops)),
    handleEmailFrequencyChange: (e) => dispatch(emailFrequencyChange(e.target.value)),
    onSubmitSettings: (e) => {
      e.preventDefault()
      dispatch(submitSettingsForm())
    },
    onClickResendVerification: () => {dispatch(resendVerificationEmail())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)
