import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {emailFrequencyChange} from './SettingsPageActions'
import SettingsPageComponent from './SettingsPageComponent'

export const SETTINGS_PAGE = 'SETTINGS_PAGE'

class SettingsPage extends Component {
  render() {
    const {
      handleEmailFrequencyChange,
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPageComponent
          handleEmailFrequencyChange={handleEmailFrequencyChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailFrequencyChange: (e) => {console.log(e.target.value)},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)