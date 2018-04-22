import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ShopPickerComponent from './ShopPickerComponent'

import {pullAllShops} from '../../services/ShopDataActions'
import {writeSingleShopPickerRef, clearWriteSingleShopOnlyShopPicker,
  shopPickerInputChange, sendShopRequestEmail} 
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
      writeSingleShopOnlyOnPickedShopsChange,
      writeSingleShopPickerRef,
      clearWriteSingleShopOnlyShopPicker,
      placeholder,
      tabIndex,
      areShopsLoading,
      isWriteSingleShopOnly,
      isReadOnly,
      onInputChange,
      sentShopRequest,
      onClickRequestShop
    } = this.props

    return (
      <div>
        {!isWriteSingleShopOnly ?
          <ShopPickerComponent
            tabIndex={tabIndex}
            className={className + " read-only-picker"}
            shops={shops || []}
            onPickNewShop={shop => {
              onPickedShopsChange(shop)}}
            pickedShops={pickedShops}
            placeholder={placeholder}
            areShopsLoading={areShopsLoading}
            isReadOnly={isReadOnly}
            isWriteSingleShopOnly={false}
            onInputChange={onInputChange}
            sentShopRequest={sentShopRequest}
            onClickRequestShop={onClickRequestShop}
          />
          :
          <ShopPickerComponent
            tabIndex={tabIndex}
            className={className}
            shops={shops || []}
            onPickNewShop={shop => {
              writeSingleShopOnlyOnPickedShopsChange(shop)
            }}
            writeSingleShopPickerRef={ref => {
              writeSingleShopPickerRef(ref)}}
            clearWriteSingleShopOnlyShopPicker={clearWriteSingleShopOnlyShopPicker}
            pickedShops={pickedShops}
            placeholder={placeholder}
            areShopsLoading={areShopsLoading}
            isReadOnly={false}
            isWriteSingleShopOnly={true}
            onInputChange={onInputChange}
            sentShopRequest={sentShopRequest}
            onClickRequestShop={onClickRequestShop}
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
    isWriteSingleShopOnly: ownProps.isWriteSingleShopOnly,
    isReadOnly: ownProps.isReadOnly,
    sentShopRequest: state.sentShopRequest
  })
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getAllShops: () => dispatch(pullAllShops()),
    onPickedShopsChange: (shops) => dispatch(ownProps.onPickedShopsChange(shops)),
    writeSingleShopOnlyOnPickedShopsChange: (shop) => dispatch(ownProps.writeSingleShopOnlyOnPickedShopsChange(shop)),
    writeSingleShopPickerRef: (ref) => dispatch(writeSingleShopPickerRef(ref)),
    clearWriteSingleShopOnlyShopPicker: () => dispatch(clearWriteSingleShopOnlyShopPicker()),
    onInputChange: (input) => dispatch(shopPickerInputChange(input)),
    onClickRequestShop: () => dispatch(sendShopRequestEmail())
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
