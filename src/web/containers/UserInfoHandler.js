import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {pullUserInfo, signOut} from '../actions/UserInfoActions'
import {showLogin, showSignUp} from '../actions/AuthActions'
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
        onShopSignUp={this.props.onShowSignUp}
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
      browserHistory.push('/')
      dispatch(signOut())
    },
    onHome: () => browserHistory.push('/')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoHandler)