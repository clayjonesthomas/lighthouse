import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pullUserInfo, signOut} from '../actions/UserInfoActions'
import {showLogin} from '../actions/AuthActions'
import UserInfo from '../components/UserInfo'

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
        signOut={this.props.signOut}
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
    signOut: () => dispatch(signOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoHandler)