import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'
import {InputGroup, Button} from 'react-bootstrap'
import ShopRecommenderBox from '../../ui-kit/ShopRecommenderBox'

const ShopPicker = (
  {
    shops,
    pickedShops,
    onSubmit,
    onAddNewShop,
    onAddShopFinderRef
  }) => (
  <form
    className={"shop-picker-search"}
    onSubmit={(e) => {
      onSubmit(e)
      e.preventDefault()
    }}>
    <InputGroup>
      <Typeahead
        emptyLabel={<ShopRecommenderBox/>}
        labelKey="name"
        multiple
        selectHintOnEnter
        options={shops.sort((a, b) => {
          let aName = a.name.toUpperCase()
          let bName = b.name.toUpperCase()
          if (aName < bName)
            return -1
          if (aName > bName)
            return 1
          return 0
        })}
        placeholder={"search for a shop..."}
        selected={pickedShops}
        onChange={onAddNewShop}
        ref={ref => {
          if(onAddShopFinderRef)
            onAddShopFinderRef(ref)
        }}
      />
    </InputGroup>
    <InputGroup.Button>
      <Button type="submit">Submit All Stores</Button>
    </InputGroup.Button>
  </form>
)

ShopPicker.propTypes = {
  onAddNewShop: PropTypes.func
}

export default ShopPicker
