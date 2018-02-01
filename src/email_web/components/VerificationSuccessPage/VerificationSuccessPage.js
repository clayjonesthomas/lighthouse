import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import VerificationSuccessPageComponent from './VerificationSuccessPageComponent'

export const VERIFICATION_SUCCESS_PAGE = 'VERIFICATION_SUCCESS_PAGE'

class VerificationSuccess extends Component {

  componentDidMount() {
    const timeToSettingRedirect = 5000;
    setTimeout(() => {
      this.props.onRedirectToSettings();
      }, timeToSettingRedirect)
  }

  render () {
    return (
      <VerificationSuccessPageComponent/>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRedirectToSettings: () => {dispatch(push('/settings'))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationSuccess)