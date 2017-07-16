import {browserHistory} from 'react-router'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MyShopsPage from '../components/MyShopsPage'
import {pullMyShops} from '../actions/MyShopsPageActions'
import {toggleStoreLike} from '../actions/StorePageActions'

class MyShopsPageHandler extends Component {
  componentDidMount () {
    this.props.getShops()
  }

  render () {
    return (
      <MyShopsPage
        shops={this.props.shops}
        onSelectShop={this.props.onSelectShop}
        onLike={this.props.onLike}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shops: state.displayedShops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getShops: () => {
      dispatch(pullMyShops())
    },
    onLike: (shop_url) => dispatch(toggleStoreLike(shop_url)),
    onSelectShop: (shop_url) => browserHistory.push(`/store/${shop_url}`)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyShopsPageHandler)