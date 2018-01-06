import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import ShopPicker, {PICKER_SETUP, PICKER_PREFERENCES} from './ShopPicker'

class ShopPickerPageHandler extends Component {

  render() {
    return (
      <div>
        <h1>SHOP PICKER PAGE</h1>
        <ShopPicker pickerType={PICKER_SETUP}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPickerPageHandler)