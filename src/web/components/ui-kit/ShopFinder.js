import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'

const ShopFinder = (
  {
    onAddNewShop,
    onSubmitShops,
    shops
  }) => (
  <Typeahead
    labelKey="name"
    multiple={true}
    options={shops}
    placeholder="add shops to your favorites..."
    onChange={onAddNewShop}
    submitFormOnEnter={onSubmitShops}
  />
)

ShopFinder.propTypes = {
  onAddNewShop: PropTypes.func,
  onSubmitShops: PropTypes.func
}

export default ShopFinder