import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pullUserInfo} from '../actions/UserInfoActions'
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoHandler)