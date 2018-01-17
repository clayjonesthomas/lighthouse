import React, {Component} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import NewPostForm from './NewPostForm'
import {pushPost, cancelPost, onSaveRef, pullShops,
  onUpdateFormShops, togglePostImportant} from './NewPostActions'
import {clearErrorMessage} from'../modals/AuthActions'

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
        onSaveCheckboxRef={this.props.onSaveCheckboxRef}
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
    errors: state.serverMessageArray,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(cancelPost())
      dispatch(push('/'))
    },
    onSubmit: () => dispatch(pushPost()),
    onSaveTitleRef: (ref) => dispatch(onSaveRef(ref, 'title')),
    onSaveCheckboxRef: (ref) => dispatch(onSaveRef(ref, 'isImportant')),
    clearErrorMessage: () => dispatch(clearErrorMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostHandler)