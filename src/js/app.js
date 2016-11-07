import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ListApp from './components/ListApp';

// Data
var ListDataExample = require('./ListDataExample');

// API
var WebAPIUtils = require('./utils/WebAPIUtils');

// CSS
require('../scss/main.scss');

ListDataExample.init();     // Load data into local storage

WebAPIUtils.default.listGetAll();

ReactDOM.render(
    <ListApp />,
    document.getElementById('container')
);
