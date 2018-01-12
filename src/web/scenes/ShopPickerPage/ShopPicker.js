import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {setMyLikedShops} from './ShopPickerActions'
import {onUpdateFormShops, pullShops} from 'scenes/NewPostPage/NewPostActions'
import {addShopFinderRef, pullMyShops, clearShopFinder}
  from 'scenes/MyShopsPage/MyShopsPageActions'
import ShopPickerComponent from './ShopPickerComponent'

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
        this.props.getAllShops()
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
      selectedShopsForm,
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
              selectedShopsForm={selectedShopsForm}
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
              selectedShopsForm={selectedShopsForm}
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
    placeholder: (ownProps.placeholder || "search for a shop..."),
    selectedShopsForm: (state.form || {})
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
      dispatch(setMyLikedShops())
      dispatch(clearShopFinder())
      dispatch(push("/email"))
    },
    onSubmitPreferenceEdit: () => {
      dispatch(setMyLikedShops())
      dispatch(clearShopFinder())
      dispatch(push("/email"))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPicker)