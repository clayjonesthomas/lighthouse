import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'

import "./ShopFinder.css"

const ShopFinder = (
  {
    onAddNewShop,
    submitShops,
    shops,
    onAddShopFinderRef,
    placeholder,
    className,
    isMultiple
  }) => (
  <Typeahead
    className={"shop-finder " + (className || "")}
    labelKey="name"
    multiple={isMultiple === "undefined" ? true : isMultiple}
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