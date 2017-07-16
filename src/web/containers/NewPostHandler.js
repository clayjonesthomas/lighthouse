import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {pushPost, cancelPost, onSaveRef, pullShops} from '../actions/NewPostActions.js'

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
        onSaveShopsRef={this.props.onSaveShopsRef}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.shops
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
    onSaveShopsRef: (ref) => dispatch(onSaveRef(ref, 'shops')),
    onSaveGenderRef: (ref) => dispatch(onSaveRef(ref, 'gender')),
    onSaveAgeRef: (ref) => dispatch(onSaveRef(ref, 'age'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostHandler)