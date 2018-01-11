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
        filterBy={(option, text) => {
          for (var i=0; i < option.recognized_names.length; i++) {
            var recognized_name = option.recognized_names[i] 
            //TODO when we store these in the backend, store them all lower case with no punctuation
            //to save time so that the only thing that needs to be processed here is the inputted text
            text = text.replace(/[^a-zA-Z0-9]/g,'')
            text = text.toLowerCase()
            if (recognized_name.indexOf(text) !== -1) {
              return true
            }
          }
          return false
        }}
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
