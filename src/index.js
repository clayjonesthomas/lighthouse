import { createStore } from 'redux'
import lighthouse from '../reducers/reducer.js'
import React from 'react';
import ReactDOM from 'react-dom';
import NewPostHandler from 'containers/NewPostHandler'
import {Provider} from 'react-redux'
let store = createStore(lighthouse)

import './index.css';
ReactDOM.render(
  <Provider store={store}>
    <NewPostHandler />
  </Provider>,
  document.getElementById('root')
);
