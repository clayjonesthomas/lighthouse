import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import LandingPageComponent from './LandingPageComponent'
import {goToSignUp} from '../../services/NewUserActions'
import {SIGN_UP_PAGE_URL} from '../../urls'

export const LANDING_PAGE = 'LANDING_PAGE'

class LandingPage extends Component {
  
  render () {
    const {
      goToSignUp
    } = this.props
    return (
      <LandingPageComponent
        goToSignUp={goToSignUp}
      />
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const timeoutDuration = 500

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => {
      dispatch(goToSignUp())
      setTimeout(() =>
          dispatch(push(SIGN_UP_PAGE_URL)),
        timeoutDuration)
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
