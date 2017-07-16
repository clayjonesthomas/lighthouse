import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'

const ShopFinder = (
  {
    onAddNewShop,
    shops
  }) => (
  <Typeahead
    labelKey="name"
    multiple={true}
    options={shops}
    placeholder="pick a shop..."
  />
)

ShopFinder.propTypes = {
  onAddNewShop: PropTypes.isRequired
}

export default ShopFinder