import React, {PropTypes} from 'react'
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {InputGroup} from 'react-bootstrap'
import ShopRequestBox from './ShopRequestBox'
import Spinner from '../../ui-kit/Spinner'

import "./ShopPickerComponent.css"

const ShopPickerComponent = (
  {
    className,
    shops,
    pickedShops,
    onPickNewShop,
    tabIndex,
    placeholder,
    areShopsLoading,
    isReadOnly,
    isWriteSingleShopOnly,
    writeSingleShopPickerRef,
    clearWriteSingleShopOnlyShopPicker,
    onInputChange,
    onClickRequestShop
  }) => (
  <div 
    id={isWriteSingleShopOnly ? "" : "removeable-shop-picker"}
    className={className + " shop-picker-search"}
  >
    <InputGroup>
      <Typeahead
        ref={writeSingleShopPickerRef}
        inputProps={{
          "tabIndex": tabIndex,
          readOnly: isReadOnly
        }}
        // TODO hide the (incorrect) warning this produces
        // issue caused from line 490 of typeaheadContainer.js
        // see https://github.com/ericgio/react-bootstrap-typeahead/issues/292
        emptyLabel={areShopsLoading ? 
          <div id="shop-picker-spinner"><Spinner colorHex={"#aec7ea"}/></div> 
          : 
          <ShopRequestBox onClickRequestShop={onClickRequestShop}/>}
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
        multiple={!isWriteSingleShopOnly}
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
        placeholder={placeholder || "Search for your shops"}
        selected={isWriteSingleShopOnly ? [] : pickedShops}
        onInputChange={onInputChange}
        onChange = {shop => {
          onPickNewShop(shop)
          if (isWriteSingleShopOnly && shop.length) {
            setTimeout(() => clearWriteSingleShopOnlyShopPicker(), 20)
          }
        }}
        maxHeight={200} // in pixels
        minLength={1}

      />
    </InputGroup>
  </div>
)

ShopPickerComponent.propTypes = {
  onAddNewShop: PropTypes.func
}

export default ShopPickerComponent
