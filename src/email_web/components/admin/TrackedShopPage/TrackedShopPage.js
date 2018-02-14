import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {ADMIN_PAGE_URL} from '../../../urls'

import {pullLikedShops, sendEmail} from './TrackedShopActions'

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
      shopData,
      sendEmail
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
      <input type="button" onClick={sendEmail} value="send email"/>
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
    sendEmail: () =>
      dispatch(sendEmail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackedShopPage)
