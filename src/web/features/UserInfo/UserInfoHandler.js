import React, {Component} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {pullUserInfo, signOut} from './UserInfoActions'
import {showLogin, showSignUp} from '../../scenes/modals/AuthActions'
import UserInfo from './UserInfo'

class UserInfoHandler extends Component {
  componentDidMount () {
    this.props.getUserInfo()
  }

  render () {
    return (
      <UserInfo
        username={this.props.username}
        isUserInfoLoaded={this.props.isUserInfoLoaded}
        onShowLogin={this.props.onShowLogin}
        onShowSignUp={this.props.onShowSignUp}
        signOut={this.props.signOut}
        onHome={this.props.onHome}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isUserInfoLoaded: state.isUserInfoLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(pullUserInfo())
    },
    onShowLogin: () => dispatch(showLogin()),
    onShowSignUp: () => dispatch(showSignUp()),
    signOut: () => {
      dispatch(signOut())
    },
    onHome: () => dispatch(push('/'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoHandler)