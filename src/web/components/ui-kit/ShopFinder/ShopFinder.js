import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import ShopFinderComponent from "./ShopFinderComponent"
import {connect} from 'react-redux'
import {onUpdateFormShops} from '../../../actions/NewPostActions'
import {addShopsToMyShops, addShopFinderRef, clearShopFinder, goToShop}
  from '../../../actions/MyShopsPageActions'
import {pullNotMyShops} from '../../../actions/FrontPageActions'

class ShopFinder extends Component {

  componentDidMount () {
    this.props.getAllShops()
  }

  render () {
    const {
      className,
      shops,
      onAddShopFinderRef,
      onAddNewShop,
      placeholder,
      onSubmitSearch,
      onSubmitLike,
      isSearch
    } = this.props
    if (isSearch)
      return (
        <ShopFinderComponent
          className={(className || "")}
          shops={shops}
          onAddNewShop={shop => {
            onAddNewShop(shop)}}
          onAddShopFinderRef={ref =>
            onAddShopFinderRef(ref)}
          placeholder={placeholder}
          onSubmit={onSubmitSearch}
        />
      )
    else // it's a like
      return (
        <ShopFinderComponent
          className={(className || "")}
          shops={shops}
          onAddNewShop={shop => {
            onAddNewShop(shop)}}
          onAddShopFinderRef={ref =>
            onAddShopFinderRef(ref)}
          placeholder={placeholder}
          onSubmit={onSubmitLike}
        />
      )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    shops:  state.shops,
    placeholder: (ownProps.placeholder || "search for a shop...")
  })
}

function mapDispatchToProps(dispatch) {

  return {
    onAddNewShop: (shops) => dispatch(onUpdateFormShops(shops)),
    getAllShops: () => {
      dispatch(pullNotMyShops())
    },
    onSubmitSearch: () => {
      debugger
      dispatch(goToShop())
    },
    onSubmitLike: () => {
      dispatch(addShopsToMyShops)
      browserHistory.push("/my_feed")
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => dispatch(clearShopFinder()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopFinder)