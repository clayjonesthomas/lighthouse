import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'underscore'

import {emailFrequencyChange, pickedShopsChange, 
  resendVerificationEmail, submitSettingsForm,
  closeNotification} from './SettingsPageActions'
import {pullUserData} from '../../services/UserActions'
import SettingsPageComponent from './SettingsPageComponent'

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {

  componentDidMount() {
    this.props.getUserData()
  }

  render() {
    const {
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
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPageComponent
          showNotification={showNotification}
          closeNotification={closeNotification}
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showNotification: state.settings.showNotification,
    selectedShops: state.settings.selectedShops,
    emailFrequency: state.settings.emailFrequency,
    isSettingsUnchanged: 
      state.user.myEmailFrequency === state.settings.emailFrequency &&
        _.isEqual(state.user.myShops, state.settings.selectedShops),
    displaySpinner: state.settings.submitSpinner || !state.settings.spinnerComplete,
    showSavedMessage: state.settings.showSavedMessage && state.settings.spinnerComplete,
    isVerified: state.user.isVerified,
    displayResentMessage: state.settings.showResentMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeNotification: () => dispatch(closeNotification()),
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
