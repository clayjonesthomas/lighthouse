import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import LandingPage from './LandingPage'
import {goToSignUp} from '../../actions'
import {SIGN_UP_PAGE_URL} from '../../urls'

class LandingPageHandler extends Component {
  render () {
    const {
      goToSignUp
    } = this.props
    return (
      <LandingPage
        goToSignUp={goToSignUp}
      />
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => {
      dispatch(goToSignUp())
      setTimeout(() =>
          dispatch(push(SIGN_UP_PAGE_URL)),
        500)
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPageHandler)
