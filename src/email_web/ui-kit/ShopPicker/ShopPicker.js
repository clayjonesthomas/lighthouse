import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ShopPickerComponent from './ShopPickerComponent'
import AddOnlyShopPickerComponent from './AddOnlyShopPickerComponent'

import {pullAllShops} from '../../services/ShopDataActions'
import {addShopPickerRef, clearAddOnlyShopPicker} 
  from './ShopPickerActions'

class ShopPicker extends Component {

  componentDidMount () {
    this.props.getAllShops()
  }

  render () {
    const {
      className,
      shops,
      pickedShops,
      onPickedShopsChange,
      addOnlyOnPickedShopsChange,
      onAddShopPickerRef,
      clearAddOnlyShopPicker,
      placeholder,
      tabIndex,
      areShopsLoading,
      isAddOnly
    } = this.props

    return (
      <div>
        {!isAddOnly ?
          <ShopPickerComponent
            tabIndex={tabIndex}
            className={className}
            shops={shops || []}
            onPickNewShop={shop => {
              onPickedShopsChange(shop)}}
            pickedShops={pickedShops}
            placeholder={placeholder}
            areShopsLoading={areShopsLoading}
          />
          :
          <AddOnlyShopPickerComponent
            tabIndex={tabIndex}
            className={className}
            shops={shops || []}
            addOnlyOnPickNewShop={shop => {
              addOnlyOnPickedShopsChange(shop)}}
            onAddShopPickerRef={ref => {
              onAddShopPickerRef(ref)}}
            clearAddOnlyShopPicker={clearAddOnlyShopPicker}
            pickedShops={pickedShops}
            placeholder={placeholder}
            areShopsLoading={areShopsLoading}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.allShops.shopList,
    areShopsLoading: state.allShops.isLoading,
    pickedShops: ownProps.selectedShops,
    placeholder: ownProps.placeholder,
    isAddOnly: ownProps.isAddOnly
  })
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getAllShops: () => dispatch(pullAllShops()),
    onPickedShopsChange: (shops) => dispatch(ownProps.onPickedShopsChange(shops)),
    addOnlyOnPickedShopsChange: (shop) => dispatch(ownProps.addOnlyOnPickedShopsChange(shop)),
    onAddShopPickerRef: (ref) => dispatch(addShopPickerRef(ref)),
    clearAddOnlyShopPicker: () => dispatch(clearAddOnlyShopPicker()),
  }
}

ShopPicker.propTypes = {
  selectedShops: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onPickedShopsChange: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPicker)
