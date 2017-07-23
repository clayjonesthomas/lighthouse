import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'

const ShopFinder = (
  {
    onAddNewShop,
    submitShops,
    shops,
    onAddShopFinderRef
  }) => (
  <Typeahead
    labelKey="name"
    multiple={true}
    options={shops}
    placeholder="add shops to your favorites..."
    onChange={onAddNewShop}
    ref={ref => onAddShopFinderRef(ref)}
    submitFormOnEnter={submitShops}
  />
)

ShopFinder.propTypes = {
  onAddNewShop: PropTypes.func,
  submitShops: PropTypes.bool
}

export default ShopFinder