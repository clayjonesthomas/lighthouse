import { createStore } from 'redux'
import lighthouse from './reducers/reducer.js'
import NewPostHandler from './containers/NewPostHandler'
import NewPostForm from './components/NewPostForm'
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';


let store = createStore(lighthouse)

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <NewPostHandler />
  </Provider>,
  document.getElementById('root')
);
