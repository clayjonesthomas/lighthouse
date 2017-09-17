import React, {Component, PropTypes} from 'react'
import {push} from 'react-router-redux'
import ShopFinderComponent from "./ShopFinderComponent"
import {connect} from 'react-redux'
import {onUpdateFormShops, pullShops, pushPost} from 'scenes/NewPostPage/NewPostActions'
import {addShopsToMyShops, addShopFinderRef, clearShopFinder,
  goToShop}
  from 'actions/MyShopsPageActions'
import {pullNotMyShops} from 'actions/FrontPageActions'


import "./ShopFinder.css"

export const FINDER_SEARCH = "FINDER_SEARCH"
export const FINDER_LIKE = "FINDER_LIKE"
export const FINDER_FORM = "FINDER_FORM"

class ShopFinder extends Component {

  componentDidMount () {
    switch (this.props.finderType) {
      case FINDER_SEARCH:
      case FINDER_FORM:
        this.props.getAllShops()
        break
      case FINDER_LIKE:
        this.props.getNotMyShops()
        break
    }
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
      dispatch(pullShops())
    },
    getNotMyShops: () => {
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
      dispatch(push("/shops"))
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