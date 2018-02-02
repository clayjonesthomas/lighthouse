import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import HowItWorksPageComponent from './HowItWorksPageComponent'

export const HOW_IT_WORKS_PAGE = 'HOW_IT_WORKS_PAGE'

class HowItWorksPage extends Component {

  render () {
    return (
      <HowItWorksPageComponent/>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowItWorksPage)