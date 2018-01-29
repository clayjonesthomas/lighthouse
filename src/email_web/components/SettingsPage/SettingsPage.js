import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {emailFrequencyChange} from './SettingsPageActions'
import SettingsPageComponent from './SettingsPageComponent'
import {pickedShopsChange} from '../SignUpPage/SignUpPageActions' //TODO contamination

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {
  render() {
    const {
      selectedShops,
      onPickedShopsChange,
      handleEmailFrequencyChange,
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPageComponent
          selectedShops={selectedShops}
          onPickedShopsChange={onPickedShopsChange}
          handleEmailFrequencyChange={handleEmailFrequencyChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedShops: state.myShops,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPickedShopsChange: (shops) => dispatch(pickedShopsChange(shops)),
    handleEmailFrequencyChange: (e) => {console.log(e.target.value)},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)