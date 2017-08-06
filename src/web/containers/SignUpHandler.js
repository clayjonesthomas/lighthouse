import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {showLogin, signUpUser} from '../actions/AuthActions'
import SignUpModal from '../components/modals/SignUpModal'
import {onSaveRef} from '../actions/NewPostActions'

class SignUpHandler extends Component {

  render () {
    return (
      <SignUpModal
        onSignUp={this.props.onSignUp}
        onCancel={this.props.onCancel}
        showSignUp={this.props.showSignUp}
        isMobile={this.props.isMobile}
        onSaveRef={this.props.onSaveRef}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: () => dispatch(signUpUser()),
    showLogin: () => dispatch(showLogin()),
    onSaveRef: (ref, type) => dispatch(onSaveRef(ref, type))
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
)(SignUpHandler)