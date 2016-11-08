import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ListApp from './components/ListApp';
import ListView from './components/ListView';

// Data
var ItemDataExample = require('./ItemDataExample');
var ListDataExample = require('./ListDataExample');

// API
var WebAPIUtils = require('./utils/WebAPIUtils');

// CSS
require('../scss/main.scss');

ItemDataExample.init();     // Load data into local storage
ListDataExample.init();
WebAPIUtils.default.itemsGetAll();
WebAPIUtils.default.listsGetAll();

ReactDOM.render(
    <ListApp />,
    document.getElementById('container')
);
