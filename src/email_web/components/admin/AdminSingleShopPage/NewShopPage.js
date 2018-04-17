import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminSingleShopComponent from './AdminSingleShopComponent'

import {getUploadUrl} from './AdminSingleShopActions'

class NewShopPage extends Component {

  componentWillMount() {
    this.props.getUploadUrl()
  }

  render() {
    const {
      uploadUrl,
    } = this.props
    return (
      <div>
        <h1>New Shop</h1>
        <AdminSingleShopComponent
          uploadUrl={uploadUrl}
        />
      </div>
    )
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopPage)
