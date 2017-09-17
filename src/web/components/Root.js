import React, {PropTypes} from 'react'
import {createStore, applyMiddleware} from 'redux'
import ShopPageHandler from '../scenes/ShopPage/ShopPageHandler'
import PostPageHandler from '../containers/PostPageHandler'
import MyShopsPageHandler from '../containers/MyShopsPageHandler'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import lighthouse from '../reducers/reducer.js'
import NewPostHandler from '../scenes/NewPostPage/NewPostHandler'
import thunkMiddleware from 'redux-thunk'
import Container from './Container.js'
import NewShopHandler from '../containers/NewShopHandler'
import MyPostsPageHandler from '../containers/MyPostsPageHandler'
import "./Globals.css"
import AllPostsPageHandler from '../containers/AllPostsPageHandler'
import MyFeedPageHandler from '../containers/MyFeedPageHandler'
import PrivacyPolicyPage from "./PrivacyPolicyPage"

let store = createStore(
  lighthouse,
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
        <Route path="/post/:url_key" component={PostPageHandler}/>
        <Route path="/shops" component={MyShopsPageHandler}/>
        <Route path="/posts" component={MyPostsPageHandler}/>
        <Route path="/privacy_policy" component={PrivacyPolicyPage}/>
      </Route>
    </Router>
  </Provider>
);

export default Root