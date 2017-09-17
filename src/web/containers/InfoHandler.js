import React, {Component} from 'react'
import {connect} from 'react-redux'
import InfoModal from '../features/modals/components/InfoModal'
import {showLogin, showSignUp} from '../features/modals/AuthActions'

class InfoHandler extends Component {

  render () {
    return (
      <InfoModal
        onCancel={this.props.onCancel}
        onShowLogin={this.props.onShowLogin}
        onShowSignUp={this.props.onShowSignUp}
        isMobile={this.props.isMobile}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onShowSignUp: () => dispatch(showSignUp())
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
)(InfoHandler)