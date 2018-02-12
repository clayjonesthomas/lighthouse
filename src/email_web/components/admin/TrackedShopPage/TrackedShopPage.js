import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {ADMIN_PAGE_URL} from '../../../urls'

import {pullLikedShops} from './TrackedShopActions'

import ShopListComponent from './ShopListComponent'

class TrackedShopPage extends Component {

  componentDidMount () {
    this.props.pullLikedShops()
  }

  render() {
    const {
      goToNewShop,
      goToTesting,
      goToNewPost,
      shopData
    } = this.props
    return <div>
      <a onClick={goToNewPost}/>
      {
        shopData.map(shop =>
          <ShopListComponent
            key={shop.name}
            shopName={shop.name}
            shopLink={shop.website}
            shopPosts={shop.active_posts}
          />
        )
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    shopData: state.trackedShops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToNewShop: () => {
    },
    goToTesting: () => {
    },
    goToNewPost: () =>
      dispatch(push(ADMIN_PAGE_URL)),
    pullLikedShops: () =>
      dispatch(pullLikedShops()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackedShopPage)
