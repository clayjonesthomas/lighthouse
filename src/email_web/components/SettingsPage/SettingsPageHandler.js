import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {onSaveSettingsRef} from './SettingsPageActions'
import UserNavBar from '../UserNavBar/UserNavBar'
import SettingsPage from './SettingsPage'

class SettingsPageHandler extends Component {
  render() {
    const {
    } = this.props
    return (
      <div id="main-page-container">
        <UserNavBar/>
        <SettingsPage
          onSaveCheckboxRef={this.props.onSaveCheckboxRef}
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
    onSaveCheckboxRef: (ref) => dispatch(onSaveSettingsRef(ref, 'isUnsubscribe'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageHandler)