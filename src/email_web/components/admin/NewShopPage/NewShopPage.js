import React, {Component} from 'react'
import {connect} from 'react-redux'

import NewShopComponent from './NewShopComponent'

import {getUploadUrl} from './NewShopActions'

class NewShopPage extends Component {

  componentWillMount() {
    this.props.getUploadUrl()
  }

  render() {
    const {
      uploadUrl,
    } = this.props
    return <NewShopComponent
      uploadUrl={uploadUrl}
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShopPage)
