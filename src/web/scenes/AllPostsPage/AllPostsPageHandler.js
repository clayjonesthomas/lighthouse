import React, {Component} from 'react'
import {connect} from 'react-redux'
import FrontPageHandler from '../FrontPage/FrontPageHandler'
import {pullFrontPagePosts, pullMoreFrontPagePosts}
  from '../FrontPage/FrontPageActions'

class AllPostsPageHandler extends Component {
  render () {
    return (
      <FrontPageHandler
        getPosts={this.props.getPosts}
        getMorePosts={this.props.getMorePosts}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(pullFrontPagePosts(true)),
    getMorePosts: () => { 
      dispatch(pullMoreFrontPagePosts(true))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPostsPageHandler)