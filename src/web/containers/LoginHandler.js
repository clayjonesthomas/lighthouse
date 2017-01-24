import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../compponents/LoginModal'
import {cancelAuth, authorizeUser} from '../actions/AuthActions'

class LoginHandler extends Component {

  render () {
    return (
      <LoginModal
        onSubmitAuthentication={this.props.onSubmitAuthentication}
        onCancel={this.props.onCancel}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitAuthentication: (user, pass) => {
      dispatch(authorizeUser(user, pass))
    },
    onCancel: () => {
      dispatch(cancelAuth())
    }
  }
}

const mapStateToProps = (state) => {
  return {modalState: state.modalState}
}

export default connect(
  mapDispatchToProps
)(LoginHandler)