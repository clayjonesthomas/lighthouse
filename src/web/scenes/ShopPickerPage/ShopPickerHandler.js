import React, {Component} from 'react'
import {connect} from 'react-redux'
import {onUpdateFormShops, pullShops} from 'scenes/NewPostPage/NewPostActions'
import {addShopFinderRef, pullMyShops, pullNotMyShops, clearShopFinder}
  from 'scenes/MyShopsPage/MyShopsPageActions'
import ShopPickerComponent from './ShopPickerComponent'

class ShopPickerHandler extends Component {

  componentDidMount () {
    this.props.getAllShops()
    if (!this.props.isSetupMode) {
      this.props.getMyShops()
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
      isSetupMode
    } = this.props

    return (
      <div>
        <h2 className="shop-picker-title">
          {isSetupMode?"Search for a shop":
            "Search for shops to add"}
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
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.shops,
    pickedShops: (state.displayedShops || []),
    placeholder: (ownProps.placeholder || "search for a shop..."),
    selectedShopsForm: (state.form || {}),
    // TODO this should be moved to state and referenced through it
    isSetupMode: ownProps.isSetupMode
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPickerHandler)