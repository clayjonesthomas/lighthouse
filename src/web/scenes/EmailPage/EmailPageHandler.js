import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import EmailPage from './EmailPage'
import {sendEmail} from './EmailActions'

class EmailPageHandler extends Component {
  render() {
    return (
      <EmailPage 
        onSubmit={this.props.onEmailSubmit}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailSubmit: () => dispatch(sendEmail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailPageHandler)