import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import VerificationSuccessPage from './VerificationSuccessPage'

class VerificationSuccessHandler extends Component {

  componentDidMount() {
    const timeToSettingRedirect = 5000;
    setTimeout(() => {
      this.props.onRedirectToSettings();
      }, timeToSettingRedirect)
  }

  render () {
    return (
      <VerificationSuccessPage/>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRedirectToSettings: () => {dispatch(push('/'))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationSuccessHandler)