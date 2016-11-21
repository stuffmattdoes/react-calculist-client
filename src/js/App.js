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
var receivedLists = false;
var receivedItems = false

// localStorage.clear();

webListGetAll.done(function(data) {
    receivedLists = true;

    if (receivedLists && receivedItems) {
        renderApp();
    }

});

webItemGetAll.done(function(data) {
    receivedItems = true;

    if (receivedLists && receivedItems) {
        renderApp();
    }
});


function renderApp() {
    ReactDOM.render(
        <AppContainer />,
        document.getElementById('container')
    );
}
