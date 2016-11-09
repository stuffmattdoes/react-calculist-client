import React from 'react';
import ReactDOM from 'react-dom';

// Components
import AppContainer from './components/AppContainer';
import ListView from './components/ListView';

// Data
var ItemDataExample = require('./ItemDataExample');
var ListDataExample = require('./ListDataExample');

// API
var WebAPIUtils = require('./utils/WebAPIUtils');

// CSS
require('../scss/main.scss');

ItemDataExample.init();     // Load data into local storage
WebAPIUtils.default.itemsGetAll();

ListDataExample.init();
WebAPIUtils.default.listsGetAll();


ReactDOM.render(
    <AppContainer />,
    document.getElementById('container')
);
