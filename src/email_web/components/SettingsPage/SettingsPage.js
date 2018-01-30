import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {emailFrequencyChange, submitSettingsForm} 
  from './SettingsPageActions'
import SettingsPageComponent from './SettingsPageComponent'
import {pickedShopsChange} from '../SignUpPage/SignUpPageActions' //TODO contamination

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {
  render() {
    const {
      selectedShops,
      emailFrequency,
      onPickedShopsChange,
      handleEmailFrequencyChange,
      onSubmitSettings
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPageComponent
          selectedShops={selectedShops}
          emailFrequency={emailFrequency}
          onPickedShopsChange={onPickedShopsChange}
          handleEmailFrequencyChange={handleEmailFrequencyChange}
          onSubmitSettings={onSubmitSettings}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("STATTTEEEE")
  console.log(state)
  return {
    selectedShops: state.settings.selectedShops,
    emailFrequency: state.settings.emailFrequency
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