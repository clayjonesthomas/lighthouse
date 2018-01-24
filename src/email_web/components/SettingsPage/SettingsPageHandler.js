import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {onSaveSettingsRef} from './SettingsPageActions'
import SettingsPage from './SettingsPage'

class SettingsPageHandler extends Component {
  render() {
    const {
    } = this.props
    return (
      <SettingsPage
        onSaveCheckboxRef={this.props.onSaveCheckboxRef}
      />
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