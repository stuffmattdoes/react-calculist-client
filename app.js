import React from 'react';
import ReactDOM from 'react-dom';

// Components
import AppContainer from './src/js/components/AppContainer';
import ListView from './src/js/components/ListView';

// Data
var ItemDataExample = require('./src/js/ItemDataExample');
var ListDataExample = require('./src/js/ListDataExample');
// var server = require('./server');

// API
var WebAPIUtils = require('./src/js/utils/WebAPIUtils');

// CSS
require('./src/scss/main.scss');

localStorage.clear();
ItemDataExample.init();     // Load data into local storage
WebAPIUtils.default.itemGetAll();
ListDataExample.init();
WebAPIUtils.default.listGetAll();

ReactDOM.render(
    <AppContainer />,
    document.getElementById('container')
);
