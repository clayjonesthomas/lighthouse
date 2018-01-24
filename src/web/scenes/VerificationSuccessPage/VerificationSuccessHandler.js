import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class VerificationSuccessHandler extends Component {
  componentDidMount() {
    console.log("COMPINENT DID MOUNT")
    setTimeout(() => {
      console.log("finished the settimeout")
      console.log(this.props)
      this.props.onRedirectToSettings();
      }, 3000)
  }

  render () {
    return (
      <div>Verification Handled Successfully</div>
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
)(VerificationSuccessHandler)