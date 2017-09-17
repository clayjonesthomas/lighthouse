import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {showLogin, signUpUser, clearErrorMessage}
  from '../AuthActions'
import SignUpModal from '../components/SignUpModal'
import {onSaveRef} from 'scenes/NewPostPage/NewPostActions'

class SignUpHandler extends Component {
  componentDidMount() {
    this.props.clearMessage()
  }

  render () {
    return (
      <SignUpModal
        onSignUp={this.props.onSignUp}
        onCancel={this.props.onCancel}
        showSignUp={this.props.showSignUp}
        isMobile={this.props.isMobile}
        onSaveRef={this.props.onSaveRef}
        messages={this.props.messages}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: () => dispatch(signUpUser()),
    showLogin: () => dispatch(showLogin()),
    onSaveRef: (ref, type) => dispatch(onSaveRef(ref, type)),
    clearMessage: () => dispatch(clearErrorMessage())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.serverMessageArray,
    onCancel: () => ownProps.onCancel(),
    isMobile: state.isMobile
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpHandler)