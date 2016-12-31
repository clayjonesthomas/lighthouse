import { createStore } from 'redux'
import lighthouse from './web/reducers/reducer.js'
import Root from './web/components/Root'
import {Provider} from 'react-redux'
import React from 'react';
import render from 'react-dom';

let store = createStore(lighthouse)

import './index.css';

render(
  <Root/>,
  document.getElementById('root')
);
