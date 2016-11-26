// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

// API
// import LocalStorageUtils from '../utils/LocalStorageUtils';
import WebAPIUtils from '../utils/WebAPIUtils';

// Data
// var ItemDataExample = require('../ItemDataExample');
// var ListDataExample = require('../ListDataExample');

// Get Local storage first
// localStorage.clear();
// ListDataExample.init();
// ItemDataExample.init();
// var localListGetAll = LocalStorageUtils.listGetAll();
// var localItemGetAll = LocalStorageUtils.itemGetAll();

// Then get web storage
// var webListGetAll = WebAPIUtils.listGetAll();
// var webItemGetAll = WebAPIUtils.itemGetAll();

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
            currentListID: null,
            receivedLists: false,
            receivedItems: false
        };
    },

    getStateFromStores: function() {
        // console.log("Home: getStateFromStores", this.state);
        this.setState({
            currentListID: ListStore.getCurrentListID()
        });
    },

    componentWillMount: function() {
        WebAPIUtils.listGetAll().done( () => {
            console.log("App: Item API call done");
            this.setState({
                receivedLists: true
            });
        });
        WebAPIUtils.itemGetAll().done( () => {
            console.log("App: List API call done");
            this.setState({
                receivedItems: true
            });
        });
        ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    render: function() {

        // if (this.state.receivedLists
        //     && this.state.receivedItems) {
        //     return (
        //         <div className="loader">Loading...</div>
        //     );
        // }

        return (
            <div className="app">
                <Header title={"Calculist"} />
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
