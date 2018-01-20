import React, {Component} from 'react'
import {connect} from 'react-redux'

import SignUpPage from './SignUpPage'

export const SIGN_UP_PAGE = 'SIGN_UP_PAGE'

class SignUpPageHandler extends Component {
  render() {
    const {
      shouldDisplay
    } = this.props
    return (
      <SignUpPage
        shouldDisplay={shouldDisplay}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shouldDisplay: ownProps.shouldDisplay
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPageHandler)
