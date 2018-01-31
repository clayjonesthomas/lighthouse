import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import _ from 'underscore'

import {emailFrequencyChange, pickedShopsChange, pullUserData, submitSettingsForm} 
  from './SettingsPageActions'
import SettingsPageComponent from './SettingsPageComponent'

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
      onSubmitSettings
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPageComponent
          selectedShops={selectedShops}
          emailFrequency={emailFrequency}
          isSettingsUnchanged={isSettingsUnchanged}
          displaySpinner={displaySpinner}
          showSavedMessage={showSavedMessage}
          onPickedShopsChange={onPickedShopsChange}
          handleEmailFrequencyChange={handleEmailFrequencyChange}
          onSubmitSettings={onSubmitSettings}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedShops: state.settings.selectedShops,
    emailFrequency: state.settings.emailFrequency,
    isSettingsUnchanged: 
      state.settings.myPreviousEmailFrequency === state.settings.emailFrequency &&
        _.isEqual(state.settings.myPreviousShops, state.settings.selectedShops),
    displaySpinner: state.settings.submitSpinner || !state.settings.spinnerComplete,
    showSavedMessage: state.settings.showSavedMessage && state.settings.spinnerComplete
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)