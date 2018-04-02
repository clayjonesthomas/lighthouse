import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {
  submitNewShop, getUploadUrl
}from './NewShopActions'

class NewShopPage extends Component {

  componentWillMount() {
    this.props.getUploadUrl()
  }

  render() {
    const {
      uploadUrl,
      submitNewShop
    } = this.props
    return <NewShopComponent
      uploadUrl={uploadUrl}
      submitNewShop={submitNewShop}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    uploadUrl: state.newShop.uploadUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUploadUrl: () => dispatch(getUploadUrl()),
    submitNewShop: (e) => {
      e.preventDefault()
      dispatch(submitNewShop())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopPage)
