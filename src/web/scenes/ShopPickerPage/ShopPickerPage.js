import React from 'react'
import ShopPickerHandler from './ShopPickerHandler'
import {InputGroup, Button} from 'react-bootstrap'

const ShopPickerPage = ({
  onSubmit,
  isSetupMode
                        }) => (
  <div>
    <h1>SHOP PICKER PAGE</h1>
    <form
      onSubmit={(e) => {
        onSubmit(e)
        e.preventDefault()}}
    >
      <ShopPickerHandler isSetupMode={isSetupMode}/>
      <InputGroup.Button>
        <Button type="submit">Submit All Stores</Button>
      </InputGroup.Button>
    </form>
  </div>
)

export default ShopPickerPage