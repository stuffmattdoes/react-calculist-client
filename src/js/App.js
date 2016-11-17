import React from 'react';
import ReactDOM from 'react-dom';

// Components
import AppContainer from './components/AppContainer';
import ListView from './components/ListView';

// Data
var ItemDataExample = require('./ItemDataExample');
var ListDataExample = require('./ListDataExample');
// var server = require('./Server');

// API
var WebAPIUtils = require('./utils/WebAPIUtils');

// CSS
require('../scss/main.scss');

localStorage.clear();
ItemDataExample.init();     // Load data into local storage
WebAPIUtils.default.itemGetAll();
ListDataExample.init();
WebAPIUtils.default.listGetAll();

ReactDOM.render(
    <AppContainer />,
    document.getElementById('container')
);
