// Libraries
import React from 'react';

// Components
import ItemView from './ItemView';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

// API
import WebAPIUtils from '../utils/WebAPIUtils';

// Data
// var ItemDataExample = require('../ItemDataExample');
// var ListDataExample = require('../ListDataExample');

// Get Local storage first
// localStorage.clear();
// ListDataExample.init();
// ItemDataExample.init();

// Then get web storage
var webListGetAll = WebAPIUtils.listGetAll();
var webItemGetAll = WebAPIUtils.itemGetAll();
var receivedLists = false;
var receivedItems = false;
/*
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
*/
// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            currentListID: null
        };
    },

    getStateFromStores: function() {
        // console.log("Home: getStateFromStores", this.state);
        this.setState({
            currentListID: ListStore.getCurrentListID()
        });
    },

    componentWillMount: function() {
        ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    render: function() {
        return (
            <div className="app">
                {this.state.currentListID == null ?
                    <ListView/>
                :
                    <ItemView/>
                }
            </div>
        );
    }
});

export default App;
