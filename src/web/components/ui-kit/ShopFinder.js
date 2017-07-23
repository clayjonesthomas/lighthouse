import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'

const ShopFinder = (
  {
    onAddNewShop,
    submitShops,
    shops,
    onAddShopFinderRef,
    placeholder
  }) => (
  <Typeahead
    labelKey="name"
    multiple={true}
    options={shops}
    placeholder={placeholder}
    onChange={onAddNewShop}
    ref={ref => {
      if(onAddShopFinderRef)
        onAddShopFinderRef(ref)
    }}
    submitFormOnEnter={submitShops}
  />
)

ShopFinder.propTypes = {
  onAddNewShop: PropTypes.func,
  submitShops: PropTypes.bool
}

export default ShopFinder