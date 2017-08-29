import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {logInUser, clearErrorMessage}
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
        isMobile={this.props.isMobile}
        onSaveRef={this.props.onSaveRef}
        messages={this.props.messages}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pass) => dispatch(logInUser(user, pass)),
    onSaveRef: (ref, type) => dispatch(onSaveRef(ref, type)),
    clearMessage: () => dispatch(clearErrorMessage()),
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
)(LoginHandler)