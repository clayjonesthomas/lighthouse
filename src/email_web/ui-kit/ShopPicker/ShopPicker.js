import React, {Component} from 'react'
import {connect} from 'react-redux'
import {onUpdateFormShops, pullShops} from 'scenes/NewPostPage/NewPostActions'
import {addShopFinderRef, pullMyShops, pullNotMyShops, clearShopFinder}
  from 'scenes/MyShopsPage/MyShopsPageActions'
import ShopPickerComponent from './ShopPickerComponent'

class ShopPicker extends Component {

  componentDidMount () {
    this.props.getAllShops()
    if (!this.props.isSetupMode) {
      this.props.getMyShops()
    }
  }

  render () {
    const {
      className,
      shops,
      pickedShops,
      selectedShopsForm,
      onAddShopFinderRef,
      onAddNewShop,
      placeholder
    } = this.props

    return (
      <ShopPickerComponent
        tabIndex="-1"
        className={className}
        shops={shops || []}
        selectedShopsForm={selectedShopsForm}
        onAddNewShop={shop => {
          onAddNewShop(shop)}}
        onAddShopFinderRef={ref =>
          onAddShopFinderRef(ref)}
        pickedShops={pickedShops}
        placeholder={placeholder}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.shops,
    pickedShops: (state.displayedShops || []),
    placeholder: (ownProps.placeholder || "search for a shop..."),
    selectedShopsForm: (state.form || {}),
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
)(ShopPicker)
