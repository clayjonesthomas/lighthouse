import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import _ from 'underscore'

import {emailFrequencyChange, pickedShopsChange, submitSettingsForm} 
  from './SettingsPageActions'
import SettingsPageComponent from './SettingsPageComponent'

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {
  render() {
    const {
      selectedShops,
      emailFrequency,
      isSettingsUnchanged,
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
        _.isEqual(state.settings.myPreviousShops, state.settings.selectedShops)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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