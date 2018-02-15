import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {
  shopTitleChange, shopSiteChange, submitNewShop,
  shopAltNamesChange
}from './NewShopActions'

class NewShopPage extends Component {

  render() {
    const {
      shopTitleValue,
      onShopTitleChange,
      shopAltNamesValue,
      onShopAltNamesChange,
      shopSiteValue,
      onShopSiteChange,
      submitNewShop
    } = this.props
    return <NewShopComponent
      shopTitleValue={shopTitleValue}
      onShopTitleChange={onShopTitleChange}
      shopAltNamesValue={shopAltNamesValue}
      onShopAltNamesChange={onShopAltNamesChange}
      shopSiteValue={shopSiteValue}
      onShopSiteChange={onShopSiteChange}
      submitNewShop={submitNewShop}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    shopTitleValue: state.newShop.shopTitleValue,
    shopSiteValue: state.newShop.shopSiteValue,
    shopAltNamesValue: state.newShop.shopAltNamesValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTitleChange: (e) =>
      dispatch(shopTitleChange(e.target.value)),
    onShopAltNamesChange: (e) =>
      dispatch(shopAltNamesChange(e.target.value)),
    onShopSiteChange: (e) =>
      dispatch(shopSiteChange(e.target.value)),
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
