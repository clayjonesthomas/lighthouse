import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {InputGroup} from 'react-bootstrap'
import ShopRecommenderBox from 'ui-kit/ShopRecommenderBox'
import Spinner from '../../ui-kit/Spinner'

import "./ShopPickerComponent.css"

const AddOnlyShopPickerComponent = (
  {
    className,
    shops,
    pickedShops,
    addOnlyOnPickNewShop,
    onAddShopPickerRef,
    clearAddOnlyShopPicker,
    tabIndex,
    placeholder,
    areShopsLoading,
  }) => (
  <div className={className + " shop-picker-search"}>
    <InputGroup>
      <Typeahead
        ref={onAddShopPickerRef}
        inputProps={{"tabIndex":tabIndex}}
        // TODO hide the (incorrect) warning this produces
        // issue caused from line 490 of typeaheadContainer.js
        // see https://github.com/ericgio/react-bootstrap-typeahead/issues/292
        emptyLabel={areShopsLoading ? <div id="shop-picker-spinner"><Spinner colorHex={"#aec7ea"}/></div> : <ShopRecommenderBox/>}
        labelKey="name"
        filterBy={(option, text) => {
          const selectedShops = pickedShops || []
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
        placeholder={placeholder || "Add a shop..."}
        onChange = {shop => {
          addOnlyOnPickNewShop(shop)
          if (shop.length) {
            clearAddOnlyShopPicker()
          }
        }}
        maxHeight={200} // in pixels
        minLength={1}
      />
    </InputGroup>
  </div>
)

export default AddOnlyShopPickerComponent
