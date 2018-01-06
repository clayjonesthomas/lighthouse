import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {onUpdateFormShops, pullShops} from 'scenes/NewPostPage/NewPostActions'
import {pullNotMyShops} from 'scenes/FrontPage/FrontPageActions'
import {addShopFinderRef, addShopsToMyShops, pullMyShops, clearShopFinder}
  from 'scenes/MyShopsPage/MyShopsPageActions'
import ShopPickerComponent from './ShopPickerComponent'
//TODO clean up imports and props const

import "./ShopPicker.css"

export const PICKER_SETUP = "PICKER_SETUP"
export const PICKER_PREFERENCES = "PICKER_PREFERENCES"

class ShopPicker extends Component {

  componentDidMount () {
    switch (this.props.pickerType) {
      case PICKER_SETUP:
        this.props.getAllShops()
        break
      case PICKER_PREFERENCES:
        this.props.getNotMyShops()
        this.props.getMyShops()
        break
      default:
        this.props.getAllShops()
    }
  }

  render () {
    const {
      shops,
      pickedShops,
      onAddShopFinderRef,
      onAddNewShop,
      placeholder,
      onSubmitSetup,
      onSubmitPreferenceEdit,
      pickerType
    } = this.props
    switch (pickerType) {
      case PICKER_SETUP:
        return (
          <div>
            <h2 className="shop-picker-title">
              {"Search for a shop"}
            </h2>
            <ShopPickerComponent
              shops={shops}
              onAddNewShop={shop => {
                onAddNewShop(shop)}}
              onAddShopFinderRef={ref =>
                onAddShopFinderRef(ref)}
              placeholder={placeholder}
              onSubmit={onSubmitSetup}
            />
          </div>
        )
      case PICKER_PREFERENCES:
        return (
          <div>
            <h2 className="shop-picker-title">
              {"Search for shops to add"}
            </h2>
            <ShopPickerComponent
              shops={shops}
              onAddNewShop={shop => {
                onAddNewShop(shop)}}
              onAddShopFinderRef={ref =>
                onAddShopFinderRef(ref)}
              pickedShops={pickedShops}
              placeholder={placeholder}
              onSubmit={onSubmitPreferenceEdit}
            />
          </div>
        )
    }
  }
}

function mapStateToProps(state, ownProps) {

  return Object.assign({}, ownProps, {
    shops:  state.shops,
    pickedShops: (state.displayedShops || []),
    placeholder: (ownProps.placeholder || "search for a shop...")
  })
}

function mapDispatchToProps(dispatch) {
  return {
    getAllShops: () => {
      dispatch(pullShops())
    },
    getMyShops: () => {
      dispatch(pullMyShops())
    },
    getNotMyShops: () => {
      dispatch(pullNotMyShops())
    },
    onAddNewShop: (shops) => {
      dispatch(onUpdateFormShops(shops))
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => dispatch(clearShopFinder()),
    onSubmitSetup: () => {
      dispatch(addShopsToMyShops())
      dispatch(clearShopFinder())
    },
    onSubmitPreferenceEdit: () => {},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPicker)