import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {pullFrontPagePosts} from '../actions/FrontPageActions'
import {showLogin} from '../actions/AuthActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    return this.props.getPosts()
  }

  render () {
    return (
      <FrontPage
        posts={this.props.posts}
        onSelectPost={this.props.onSelectPost}
        onSelectNewPost={this.props.onSelectNewPost}
        onShowLogin={this.props.onShowLogin}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.displayedPosts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(pullFrontPagePosts())
    },
    onSelectNewPost: () => browserHistory.push('/new'),
    onShowLogin: () => dispatch(showLogin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)