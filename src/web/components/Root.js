import React, {PropTypes} from 'react';
import {createStore, applyMiddleware} from 'redux'
import StorePageHandler from '../containers/StorePageHandler'
import PostPageHandler from '../containers/PostPageHandler'
import MyShopsPageHandler from '../containers/MyShopsPageHandler'
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import lighthouse from '../reducers/reducer.js'
import NewPostHandler from '../containers/NewPostHandler'
import thunkMiddleware from 'redux-thunk'
import Container from './Container.js'
import NewStoreHandler from '../containers/NewStoreHandler'
import MyPostsPageHandler from '../containers/MyPostsPageHandler'
import "./Globals.css"
import AllPostsPageHandler from '../containers/AllPostsPageHandler'
import MyFeedPageHandler from '../containers/MyFeedPageHandler'

let store = createStore(
  lighthouse,
  applyMiddleware(
    thunkMiddleware
  )
)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={AllPostsPageHandler} />
        <Route path="my_feed" component={MyFeedPageHandler} />
        <Route path="/new_shop" component={NewStoreHandler} />
        <Route path="/new" component={NewPostHandler} />
        <Route path="/store/:url_key" component={StorePageHandler}/>
        <Route path="/post/:url_key" component={PostPageHandler}/>
        <Route path="/shops" component={MyShopsPageHandler}/>
        <Route path="/posts" component={MyPostsPageHandler}/>
      </Route>
    </Router>
  </Provider>
);

export default Root