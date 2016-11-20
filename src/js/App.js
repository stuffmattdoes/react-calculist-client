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

var webListGetAll = WebAPIUtils.default.listGetAll();
var webItemGetAll = WebAPIUtils.default.itemGetAll();

webListGetAll.done(function(data) {
    renderApp();
});

function renderApp() {
    ReactDOM.render(
        <AppContainer />,
        document.getElementById('container')
    );
}
