import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminPageComponent from './AdminPageComponent'

import {postTitleChange, pickedShopsChange, isImportantChange,
  submitNewPost} from './AdminActions'

class AdminPage extends Component {

  render() {
    const {
      postTitleValue,
      selectedShops,
      isImportantValue,
      onTitleChange,
      onPickedShopsChange,
      onChangeIsImportant,
      submitNewPost
    } = this.props
    return <AdminPageComponent
        postTitleValue={postTitleValue}
        isImportantValue={isImportantValue}
        selectedShops={selectedShops}
        onTitleChange={onTitleChange}
        onPickedShopsChange={onPickedShopsChange}
        onChangeIsImportant={onChangeIsImportant}
        submitNewPost={submitNewPost}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    postTitleValue: state.admin.postTitleValue,
    selectedShops: state.admin.selectedShops,
    isImportantValue: state.admin.isImportant
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTitleChange: (e) =>
      dispatch(postTitleChange(e.target.value)),
    onPickedShopsChange: (shops) =>
      dispatch(pickedShopsChange(shops)),
    onChangeIsImportant: (e) =>
      dispatch(isImportantChange()),
    submitNewPost: (e) => {
      e.preventDefault()
      dispatch(submitNewPost())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
