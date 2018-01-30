import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {onUpdateFormShops} from 'scenes/NewPostPage/NewPostActions'
import {addShopFinderRef} from 'scenes/MyShopsPage/MyShopsPageActions'
import ShopPickerComponent from './ShopPickerComponent'

import {pullMyShops, pullMyEmailFrequency, pullAllShops} 
  from '../../services/ShopDataActions'

class ShopPicker extends Component {

  componentDidMount () {
    this.props.getAllShops()
    if (!this.props.isSetupMode) {
      this.props.getMyShops()
      this.props.getMyEmailFrequency()
    }
  }

  render () {
    const {
      className,
      shops,
      pickedShops,
      onPickedShopsChange,
      placeholder,
      tabIndex
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
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.allShops,
    pickedShops: ownProps.selectedShops,
    placeholder: ownProps.placeholder,
    isSetupMode: ownProps.isSetupMode
  })
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getAllShops: () => dispatch(pullAllShops()),
    getMyShops: () => dispatch(pullMyShops()),
    getMyEmailFrequency: () => dispatch(pullMyEmailFrequency()),
    onPickedShopsChange: (shops) => dispatch(ownProps.onPickedShopsChange(shops))
  }
}

ShopPicker.propTypes = {
  selectedShops: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  isSetupMode: PropTypes.bool,
  onPickedShopsChange: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPicker)
