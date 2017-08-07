import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {logInUser, signUpUser, showSignUp, clearErrorMessage}
  from '../actions/AuthActions'
import {onSaveRef} from '../actions/NewPostActions'

class LoginHandler extends Component {
  componentDidMount() {
    this.props.clearMessage()
  }

  render () {
    return (
      <LoginModal
        onLogin={this.props.onLogin}
        onCancel={this.props.onCancel}
        showSignUp={this.props.showSignUp}
        isMobile={this.props.isMobile}
        onSaveRef={this.props.onSaveRef}
        message={this.props.message}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pass) => dispatch(logInUser(user, pass)),
    showSignUp: () => dispatch(showSignUp()),
    onSaveRef: (ref, type) => dispatch(onSaveRef(ref, type)),
    clearMessage: () => dispatch(clearErrorMessage())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.serverMessage,
    onCancel: () => ownProps.onCancel(),
    isMobile: state.isMobile
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHandler)