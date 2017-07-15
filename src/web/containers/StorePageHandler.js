import {connect} from 'react-redux'
import StorePage from '../components/StorePage'
import {pullStore} from '../actions/StorePageActions'
import React, {Component} from 'react'

class StorePageHandler extends Component {
  componentDidMount () {
    this.props.getStore(this.props.params.url_key)
  }

  render () {
    return (
      <StorePage
        name={this.props.name}
        website={this.props.website}
        likes={this.props.likes}
        timestamp={this.props.timestamp}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStore: (url_key) => {
      dispatch(pullStore(url_key))
    }
  }
}
const mapStateToProps = (state) => {
  return {
    name: state.store.name,
    website: state.store.website,
    likes: state.store.likes,
    timestamp: state.store.timestamp
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePageHandler)