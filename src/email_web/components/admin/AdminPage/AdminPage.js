import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {TRACKED_SHOPS_URL} from '../../../urls'

import AdminPageComponent from './AdminPageComponent'

class AdminPage extends Component {

  render() {
    const {
      goToNewShop,
      goToTesting,
      goToTrackedShops,
      postTitleValue,
      selectedShops,
      onTitleChange,
      onPickedShopsChange,
      submitNewPost
    } = this.props
    return <AdminPageComponent
        goToNewShop={goToNewShop}
        goToTesting={goToTesting}
        goToTrackedShops={goToTrackedShops}
        postTitleValue={postTitleValue}
        selectedShops={selectedShops}
        onTitleChange={onTitleChange}
        onPickedShopsChange={onPickedShopsChange}
        submitNewPost={submitNewPost}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    postTitleValue: state.admin.postTitleValue,
    selectedShops: state.admin.selectedShops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToNewShop: () => {},
    goToTesting: () => {},
    goToTrackedShops: () => {
      dispatch(push(TRACKED_SHOPS_URL))
    },
    submitNewPost: () => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
