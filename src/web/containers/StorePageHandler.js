import $ from 'jquery'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import StorePage from '../components/StorePage'
import {pullSinglePost} from '../actions/PostPageActions'
import React, {Component, PropTypes} from 'react'

class StorePageHandler extends Component {
  componentDidMount () {
    return this.props.getPost(this.props.params.url_key)
  }

  render () {
    return (
      <StorePage
        title={this.props.title}
        store={this.props.store}
        likes={this.props.likes}
        timestamp={this.props.timestamp}
        author={this.props.author}/>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (url_key) => {
      dispatch(pullSinglePost(url_key))
    },
  }
}

export default connect(
  mapDispatchToProps
)(StorePageHandler)