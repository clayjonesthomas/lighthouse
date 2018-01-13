import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {setMyLikedShops} from './ShopPickerActions'
import {clearShopFinder} from 'scenes/MyShopsPage/MyShopsPageActions'

import ShopPickerPage from './ShopPickerPage'

class ShopPickerPageHandler extends Component {
  render() {
    const {
      onSubmit,
      isSetupMode
    } = this.props
    return (
      <ShopPickerPage
        onSubmit={onSubmit}
        isSetupMode={isSetupMode}
      />
    )
  }
}

const isSetupMode = true

const mapStateToProps = () => {
  return {
    isSetupMode: isSetupMode
  }
}

const mapDispatchToProps = (dispatch) => {
  const onSubmitSetup = () => {
    dispatch(setMyLikedShops())
    dispatch(clearShopFinder())
    dispatch(push("/email"))
  }
  const onSubmitPreferenceEdit = () => {
    dispatch(setMyLikedShops())
    dispatch(clearShopFinder())
    dispatch(push("/email"))
  }
  let onSubmit = onSubmitPreferenceEdit
  if (isSetupMode) {
    onSubmit = onSubmitSetup
  }
  return {
    onSubmit: onSubmit
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPickerPageHandler)
