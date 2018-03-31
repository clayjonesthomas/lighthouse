import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {
  shopNameChange, shopSiteChange, submitNewShop,
  shopAltNamesChange, getUploadUrl
}from './NewShopActions'

class NewShopPage extends Component {

  componentWillMount() {
    this.props.getUploadUrl()
  }

  render() {
    const {
      shopNameValue,
      onShopNameChange,
      shopAltNamesValue,
      onShopAltNamesChange,
      shopSiteValue,
      onShopSiteChange,
      uploadUrl,
      submitNewShop
    } = this.props
    return <NewShopComponent
      shopNameValue={shopNameValue}
      onShopNameChange={onShopNameChange}
      shopAltNamesValue={shopAltNamesValue}
      onShopAltNamesChange={onShopAltNamesChange}
      shopSiteValue={shopSiteValue}
      onShopSiteChange={onShopSiteChange}
      uploadUrl={uploadUrl}
      submitNewShop={submitNewShop}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    shopNameValue: state.newShop.shopNameValue,
    shopSiteValue: state.newShop.shopSiteValue,
    shopAltNamesValue: state.newShop.shopAltNamesValue,
    uploadUrl: state.newShop.uploadUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShopNameChange: (e) =>
      dispatch(shopNameChange(e.target.value)),
    onShopAltNamesChange: (e) =>
      dispatch(shopAltNamesChange(e.target.value)),
    onShopSiteChange: (e) =>
      dispatch(shopSiteChange(e.target.value)),
    getUploadUrl: () => dispatch(getUploadUrl()),
    submitNewShop: (e) => {
      e.preventDefault()
      dispatch(submitNewShop())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopPage)
