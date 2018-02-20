import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {
  shopNameChange, shopSiteChange, submitNewShop,
  shopAltNamesChange
}from './NewShopActions'

class NewShopPage extends Component {

  render() {
    const {
      shopNameValue,
      onShopNameChange,
      shopAltNamesValue,
      onShopAltNamesChange,
      shopSiteValue,
      onShopSiteChange,
      submitNewShop
    } = this.props
    return <NewShopComponent
      shopNameValue={shopNameValue}
      onShopNameChange={onShopNameChange}
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
    shopNameValue: state.newShop.shopNameValue,
    shopSiteValue: state.newShop.shopSiteValue,
    shopAltNamesValue: state.newShop.shopAltNamesValue
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
