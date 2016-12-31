import { createStore } from 'redux'
import lighthouse from './web/reducers/reducer.js'
import Root from './web/components/Root'
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';

let store = createStore(lighthouse)

import './index.css';
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
