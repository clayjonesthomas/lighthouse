import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LoginModal from '../components/modals/LoginModal'
import {cancelModal, logInUser, signUpUser} from '../actions/AuthActions'

class LoginHandler extends Component {

  render () {
    return (
      <LoginModal
        onLogin={this.props.onLogin}
        onCancel={this.props.onCancel}
        showSignUp={this.props.showSignUp}
        isMoble={this.props.isMobile}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pass) => dispatch(logInUser(user, pass)),
    showSignUp: () => dispatch(showSignUp())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    onCancel: () => ownProps.onCancel(),
    isMobile: state.isMobile
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHandler)