import React, {PropTypes} from 'react'
import {createStore, applyMiddleware} from 'redux'
import ShopPageHandler from 'scenes/ShopPage/ShopPageHandler'
import MyShopsPageHandler from 'scenes/MyShopsPage/MyShopsPageHandler'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import reducer from 'reducers/index'
import NewPostHandler from 'scenes/NewPostPage/NewPostHandler'
import thunkMiddleware from 'redux-thunk'
import Container from 'scenes/Container/Container'
import NewShopHandler from 'scenes/NewShopPage/NewShopHandler'
import MyPostsPageHandler from 'scenes/MyPostsPage/MyPostsPageHandler'
import "scenes/Container/Globals.css"
import AllPostsPageHandler from 'scenes/AllPostsPage/AllPostsPageHandler'
import MyFeedPageHandler from 'scenes/MyFeedPage/MyFeedPageHandler'
import PrivacyPolicyPage from "scenes/PrivacyPolicyPage/PrivacyPolicyPage"
import EmailHandler from 'scenes/EmailPage/EmailPageHandler'
import ShopPickerHandler from 'scenes/ShopPickerPage/ShopPickerPageHandler'

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory)
  )
)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={AllPostsPageHandler} />
        <Route path="my_feed" component={MyFeedPageHandler} />
        <Route path="/new_shop" component={NewShopHandler} />
        <Route path="/new" component={NewPostHandler} />
        <Route path="/shop/:url_key" component={ShopPageHandler}/>
        <Route path="/shops" component={MyShopsPageHandler}/>
        <Route path="/posts" component={MyPostsPageHandler}/>
        <Route path="/privacy_policy" component={PrivacyPolicyPage}/>
        <Route path="/email" component={EmailHandler}/>
        <Route path="/shop_picker" component={ShopPickerHandler}/>
      </Route>
    </Router>
  </Provider>
);

export default Root