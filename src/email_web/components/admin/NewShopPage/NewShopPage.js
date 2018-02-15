import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {
  shopTitleChange, shopSiteChange, submitNewShop
}
  from './NewShopActions'

class NewShopPage extends Component {

  render() {
    const {
      shopTitleValue,
      onShopTitleChange,
      shopSiteValue,
      onShopSiteChange,
      submitNewShop
    } = this.props
    return <NewShopComponent
      shopTitleValue={shopTitleValue}
      onShopTitleChange={onShopTitleChange}
      shopSiteValue={shopSiteValue}
      onShopSiteChange={onShopSiteChange}
      submitNewShop={submitNewShop}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    shopTitleValue: state.newShop.shopTitleValue,
    shopSiteValue: state.newShop.shopSiteValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTitleChange: (e) =>
      dispatch(shopTitleChange(e.target.value)),
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
