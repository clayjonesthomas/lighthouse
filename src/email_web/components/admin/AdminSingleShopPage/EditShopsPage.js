import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminSingleShopComponent from './AdminSingleShopComponent'
import ShopPicker from '../../../ui-kit/ShopPicker/ShopPicker'

import {getUploadUrl, editShopPickerChange,
  shopNameChange, shopSiteChange, shopAltNamesChange} 
  from './AdminSingleShopActions'

class EditShopsPage extends Component {

  componentWillMount() {
    this.props.getUploadUrl()
  }

  render() {
    const {
      onPickedShopsChange,
      uploadUrl,
      shopKey,
      onShopNameChange,
      shopNameValue,
      onShopAltNamesChange,
      shopAltNamesValue,
      onShopSiteChange,
      shopSiteValue,
      shopIconImageUrl
    } = this.props
    return (
      <div>
        <h1>Edit Shop</h1>
        <ShopPicker
          onPickedShopsChange={onPickedShopsChange}
          className="admin-shop-picker"
          selectedShops={[]}
        />
        <AdminSingleShopComponent
          uploadUrl={uploadUrl}
          shopKey={shopKey}
          onShopNameChange={onShopNameChange}
          shopNameValue={shopNameValue}
          onShopAltNamesChange={onShopAltNamesChange}
          shopAltNamesValue={shopAltNamesValue}
          onShopSiteChange={onShopSiteChange}
          shopSiteValue={shopSiteValue}
          shopIconImageUrl={shopIconImageUrl}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploadUrl: state.editShop.uploadUrl,
    shopKey: state.editShop.shopKey,
    shopNameValue: state.editShop.shopNameValue,
    shopAltNamesValue: state.editShop.shopAltNamesValue,
    shopSiteValue: state.editShop.shopSiteValue,
    shopIconImageUrl: state.editShop.shopIconImageUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUploadUrl: () => dispatch(getUploadUrl()),
    onPickedShopsChange: (shops) => dispatch(editShopPickerChange(shops)),
    onShopNameChange: (e) =>
      dispatch(shopNameChange(e.target.value)),
    onShopAltNamesChange: (e) =>
      dispatch(shopAltNamesChange(e.target.value)),
    onShopSiteChange: (e) =>
      dispatch(shopSiteChange(e.target.value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShopsPage)
