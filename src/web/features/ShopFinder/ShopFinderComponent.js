import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'
import {InputGroup, Button} from 'react-bootstrap'
import ShopRecommenderBox from '../../ui-kit/ShopRecommenderBox'

import "./ShopFinder.css"
const ShopFinder = (
  {
    className,
    onAddNewShop,
    shops,
    onAddShopFinderRef,
    placeholder,
    isMultiple,
    onSubmit
  }) => (
  <form
    className={"shop-finder " + (className || "")}
    onSubmit={(e) => {
      onSubmit(e)
      e.preventDefault()
    }}>
    <InputGroup>
      <Typeahead
        emptyLabel={<ShopRecommenderBox/>}
        labelKey="name"
        multiple={isMultiple === "undefined" ? true : isMultiple}
        options={shops.sort((a, b) => {
          let aName = a.name.toUpperCase()
          let bName = b.name.toUpperCase()
          if (aName < bName)
            return -1
          if (aName > bName)
            return 1
          return 0
        })}
        placeholder={placeholder}
        onChange={onAddNewShop}
        ref={ref => {
          if(onAddShopFinderRef)
            onAddShopFinderRef(ref)
        }}
        submitFormOnEnter={true}
      />
      <InputGroup.Button>
        <Button type="submit">Go</Button>
      </InputGroup.Button>
    </InputGroup>
  </form>
)

ShopFinder.propTypes = {
  onAddNewShop: PropTypes.func,
  submitShops: PropTypes.bool,
  shops: PropTypes.isRequired
}

export default ShopFinder