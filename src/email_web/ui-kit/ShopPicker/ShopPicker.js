import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ShopPickerComponent from './ShopPickerComponent'

import {pullAllShops} from '../../services/ShopDataActions'

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
      placeholder,
      tabIndex,
      areShopsLoading
    } = this.props

    return (
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
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.allShops.shopList,
    areShopsLoading: state.allShops.isLoading,
    pickedShops: ownProps.selectedShops,
    placeholder: ownProps.placeholder
  })
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getAllShops: () => dispatch(pullAllShops()),
    onPickedShopsChange: (shops) => dispatch(ownProps.onPickedShopsChange(shops))
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
