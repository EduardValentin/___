/* eslint react/no-render-return-value: 0 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';


import store from 'store';
import Main from 'components/Main';

// Import main css file.
import './style.js';

// const config = require('config.json');

// import(`templates/${config['template-name']}/style.js`);


ReactDOM.render(
  (
    <Provider store={store}>
      <Main />
    </Provider>
  ),
  document.querySelector('#app-container'),
);
