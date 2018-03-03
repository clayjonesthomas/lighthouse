import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import HowItWorksPageComponent from './HowItWorksPageComponent'

import {PRIVACY_POLICY_PAGE_URL} from '../../urls'

export const HOW_IT_WORKS_PAGE = 'HOW_IT_WORKS_PAGE'

class HowItWorksPage extends Component {

  render() {
    const {
      goToPrivacyPolicy,
    } = this.props
    return (
      <HowItWorksPageComponent
        goToPrivacyPolicy={goToPrivacyPolicy}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToPrivacyPolicy: () => dispatch(push(PRIVACY_POLICY_PAGE_URL)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowItWorksPage)
