import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {InputGroup} from 'react-bootstrap'
import ShopRecommenderBox from 'ui-kit/ShopRecommenderBox'

import "./ShopPickerComponent.css"

const ShopPickerComponent = (
  {
    className,
    shops,
    selectedShopsForm,
    pickedShops,
    onAddNewShop,
    onAddShopFinderRef,
    tabIndex
  }) => (
  <div className={className + " shop-picker-search"}>
    <InputGroup>
      <Typeahead
        inputProps={{"tabIndex":tabIndex}}
        // TODO hide the (incorrect) warning this produces
        // issue caused from line 490 of typeaheadContainer.js
        // see https://github.com/ericgio/react-bootstrap-typeahead/issues/292
        emptyLabel={<ShopRecommenderBox/>}
        labelKey="name"
        filterBy={(option, text) => {
          const selectedShops = selectedShopsForm.shops || pickedShops || []
          const selectedShopKeys = selectedShops.map(shop => shop.key)
          if (selectedShopKeys.indexOf(option.key) !== -1) {
            return false
          }

          let recognizedNames = [option.name.replace(/[^a-zA-Z0-9]/g,'')]
          if (option.alternate_names) {
            recognizedNames = recognizedNames.concat(option.alternate_names)
          }
          recognizedNames = recognizedNames.map(recognizedName => recognizedName.toLowerCase())

          for (let i=0; i < recognizedNames.length; i++) {
            const recognized_name = recognizedNames[i]
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
        placeholder={"Pick your shops"}
        selected={pickedShops}
        onChange={onAddNewShop}
        ref={ref => {
          if(onAddShopFinderRef)
            onAddShopFinderRef(ref)
        }}
        maxHeight={300} // in pixels
      />
    </InputGroup>
  </div>
)

ShopPickerComponent.propTypes = {
  onAddNewShop: PropTypes.func
}

export default ShopPickerComponent
