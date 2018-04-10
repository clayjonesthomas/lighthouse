import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'
import ShopPicker from '../../../ui-kit/ShopPicker/ShopPicker'

import {getUploadUrl, editShopPickerChange,
  shopNameChange, shopSiteChange, shopAltNamesChange} 
  from './NewShopActions'

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
        <ShopPicker
          onPickedShopsChange={onPickedShopsChange}
          className="admin-shop-picker"
          selectedShops={[]}
        />
        <NewShopComponent
          uploadUrl={uploadUrl}
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
    shopKey: state.editShop.selectedShop.key,
    shopName: state.editShop.selectedShop.name,
    shopAltNames: state.editShop.selectedShop.alternate_names,
    shopSite: state.editShop.selectedShop.website,
    shopIconImageUrl: state.editShop.selectedShop.icon_image_serving_url
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
