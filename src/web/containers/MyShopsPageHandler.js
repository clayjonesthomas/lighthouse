import {browserHistory} from 'react-router'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MyShopsPage from '../components/MyShopsPage'
import {pullMyShops, addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'
import {toggleShopLike} from '../actions/ShopPageActions'
import {pullShops, onUpdateFormShops} from '../actions/NewPostActions'
import {pullNotMyShops} from '../actions/FrontPageActions'

class MyShopsPageHandler extends Component {
  componentDidMount () {
    this.props.getMyShops()
  }

  render () {
    return (
      <MyShopsPage
        myShops={this.props.myShops}
        onSelectShop={this.props.onSelectShop}
        areShopsLoaded={this.props.areMyShopsLoaded}
        onLike={this.props.onLike}
        isMobile={this.props.isMobile}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myShops: state.displayedShops,
    areMyShopsLoaded: state.areMyShopsLoaded,
    isMobile: state.isMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyShops: () => {
      dispatch(pullMyShops())
    },
    onLike: (shop_url) => dispatch(toggleShopLike(shop_url)),
    onSelectShop: (shop_url) => browserHistory.push(`/store/${shop_url}`),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyShopsPageHandler)