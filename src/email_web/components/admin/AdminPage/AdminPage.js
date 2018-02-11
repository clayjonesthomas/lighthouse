import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {TRACKED_SHOPS_LIST} from '../../../urls'

class AdminPage extends Component {

  render() {
    const {
      goToNewShop,
      goToTesting,
      goToTrackedShopsList,
      submitNewPost
    } = this.props
    return <AdminPageComponent
        goToNewShop={goToNewShop}
        goToTesting={goToTesting}
        goToTrackedShops={goToTrackedShopsList}
        submitNewPost={submitNewPost}
      />
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToNewShop: () => {},
    goToTesting: () => {},
    goToTrackedShopSList: () => {
      dispatch(push(TRACKED_SHOPS_LIST))
    },
    submitNewPost: () => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
