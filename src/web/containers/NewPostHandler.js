import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {pushPost, cancelPost, onSaveRef, pullShops,
  onUpdateFormShops} from '../actions/NewPostActions.js'

class NewPostHandler extends Component {

  componentDidMount () {
    this.props.getShops()
  }

  render () {
    return (
      <NewPostForm
        shops={this.props.shops}
        onSubmit={this.props.onSubmit}
        onCancel={this.props.onCancel}
        onSaveTitleRef={this.props.onSaveTitleRef}
        onUpdateFormShops={this.props.onUpdateFormShops}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.shops.map(shop => {
      return {
        name: shop.name,
        key: shop.key,
        icon: ''
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getShops: () => dispatch(pullShops()),
    onCancel: () => {
      dispatch(cancelPost())
      browserHistory.push('/')
    },
    onSubmit: () => {
      dispatch(pushPost())
        .then(response => browserHistory.push(`/`))
    },
    onSaveTitleRef: (ref) => dispatch(onSaveRef(ref, 'title')),
    onUpdateFormShops: (shops) => dispatch(onUpdateFormShops(shops))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostHandler)