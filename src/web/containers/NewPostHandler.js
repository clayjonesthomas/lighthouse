import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {pushPost, cancelPost, onSaveRef, pullShops,
  onUpdateFormShops} from '../actions/NewPostActions'
import {clearErrorMessage} from'../actions/AuthActions'

class NewPostHandler extends Component {

  componentWillUnmount () {
    this.props.clearErrorMessage()
  }

  render () {
    return (
      <NewPostForm
        onSubmit={this.props.onSubmit}
        onCancel={this.props.onCancel}
        onSaveTitleRef={this.props.onSaveTitleRef}
        onUpdateFormShops={this.props.onUpdateFormShops}
        isMobile={this.props.isMobile}
        errors={this.props.errors}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile,
    errors: state.serverMessageArray
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(cancelPost())
      browserHistory.push('/')
    },
    onSubmit: () => dispatch(pushPost()),
    onSaveTitleRef: (ref) => dispatch(onSaveRef(ref, 'title')),
    clearErrorMessage: () => dispatch(clearErrorMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostHandler)