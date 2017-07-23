import {browserHistory} from 'react-router'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MyShopsPage from '../components/MyShopsPage'
import {pullMyShops, addShopsToMyShops, addShopFinderRef, clearShopFinder}
  from '../actions/MyShopsPageActions'
import {toggleStoreLike} from '../actions/StorePageActions'
import {pullShops, onUpdateFormShops} from '../actions/NewPostActions'

class MyShopsPageHandler extends Component {
  componentDidMount () {
    this.props.getMyShops()
    this.props.getAllShops()
  }

  render () {
    return (
      <MyShopsPage
        myShops={this.props.myShops}
        onSelectShop={this.props.onSelectShop}
        areShopsLoaded={this.props.areMyShopsLoaded}
        onLike={this.props.onLike}
        shops={this.props.shops}
        onAddNewShop={this.props.onAddNewShop}
        onSubmitShops={this.props.onSubmitShops}
        onAddShopFinderRef={this.props.onAddShopFinderRef}
        clearShopFinder={this.props.clearShopFinder}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myShops: state.displayedShops,
    areMyShopsLoaded: state.areMyShopsLoaded,
    shops: state.shops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyShops: () => {
      dispatch(pullMyShops())
    },
    onLike: (shop_url) => dispatch(toggleStoreLike(shop_url)),
    onSelectShop: (shop_url) => browserHistory.push(`/store/${shop_url}`),
    onAddNewShop: (shops) => dispatch(onUpdateFormShops(shops)),
    getAllShops: () => {
      dispatch(pullShops())
    },
    onSubmitShops: () => {
      dispatch(addShopsToMyShops())
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => {dispatch(clearShopFinder())}

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyShopsPageHandler)