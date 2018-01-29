import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {emailFrequencyChange} from './SettingsPageActions'
import SettingsPage from './SettingsPage'

class SettingsPageHandler extends Component {
  render() {
    const {
      handleEmailFrequencyChange,
    } = this.props
    return (
      <div id="main-page-container">
        <SettingsPage
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
)(SettingsPageHandler)