import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import ShopFinderComponent from "./ShopFinderComponent"
import {connect} from 'react-redux'
import {onUpdateFormShops} from '../../../actions/NewPostActions'
import {addShopsToMyShops, addShopFinderRef, clearShopFinder,
  goToShop}
  from '../../../actions/MyShopsPageActions'
import {pullNotMyShops} from '../../../actions/FrontPageActions'
import {pushPost} from '../../../actions/NewPostActions'

import "./ShopFinder.css"

export const FINDER_SEARCH = "FINDER_SEARCH"
export const FINDER_LIKE = "FINDER_LIKE"
export const FINDER_FORM = "FINDER_FORM"

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
      onSubmitForm,
      finderType
    } = this.props
    switch (finderType) {
      case FINDER_SEARCH:
        return (
          <div>
            <h2 className="shop-finder-title">
              {"Search For a Shop"}
            </h2>
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
          </div>
        )
      case FINDER_LIKE:
        return (
          <div>
            <h2 className="shop-finder-title">
              {"Like a Shop"}
            </h2>
            <ShopFinderComponent
              className={(className || "")}
              shops={shops}
              onAddNewShop={shop => {
                onAddNewShop(shop)}}
              onAddShopFinderRef={ref =>
                onAddShopFinderRef(ref)}
              placeholder={"find a shop to like..."}
              onSubmit={onSubmitLike}
            />
          </div>
        )
      case FINDER_FORM:
        return (
          <ShopFinderComponent
            className={(className || "")}
            shops={shops}
            onAddNewShop={shop => {
              onAddNewShop(shop)}}
            onAddShopFinderRef={ref =>
              onAddShopFinderRef(ref)}
            placeholder={placeholder}
            onSubmit={onSubmitForm}
          />
        )
    }
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
    onAddNewShop: (shops) => {
      dispatch(onUpdateFormShops(shops))
    },
    getAllShops: () => {
      dispatch(pullNotMyShops())
    },
    onAddShopFinderRef: (ref) => {
      dispatch(addShopFinderRef(ref))
    },
    clearShopFinder: () => dispatch(clearShopFinder()),
    onSubmitSearch: () => {
      dispatch(goToShop())
    },
    onSubmitLike: () => {
      dispatch(addShopsToMyShops())
      browserHistory.push("/shops")
      window.location.reload()
    },
    onSubmitForm: () => {
      dispatch(pushPost())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopFinder)