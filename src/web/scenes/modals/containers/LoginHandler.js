import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/LoginModal'
import {logInUser, clearErrorMessage}
  from '../AuthActions'
import {onSaveRef} from 'scenes/NewPostPage/NewPostActions'

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