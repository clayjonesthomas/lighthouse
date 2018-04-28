import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminPageComponent from './AdminPageComponent'

import {postTitleChange, pickedShopsChange, isImportantChange,
  customSaleLinkChange, submitNewPost} from './AdminActions'

class AdminPage extends Component {

  render() {
    const {
      postTitleValue,
      selectedShops,
      isImportantValue,
      customSaleLinkValue,
      onTitleChange,
      onPickedShopsChange,
      onChangeIsImportant,
      onCustomSaleLinkChange,
      submitNewPost
    } = this.props
    return <AdminPageComponent
        postTitleValue={postTitleValue}
        isImportantValue={isImportantValue}
        customSaleLinkValue={customSaleLinkValue}
        selectedShops={selectedShops}
        onTitleChange={onTitleChange}
        onPickedShopsChange={onPickedShopsChange}
        onChangeIsImportant={onChangeIsImportant}
        onCustomSaleLinkChange={onCustomSaleLinkChange}
        submitNewPost={submitNewPost}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    postTitleValue: state.admin.postTitleValue,
    selectedShops: state.admin.selectedShops,
    isImportantValue: state.admin.isImportant,
    customSaleLinkValue: state.admin.customSaleLinkValue
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
    onCustomSaleLinkChange: (e) => 
      dispatch(customSaleLinkChange(e.target.value)),
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
