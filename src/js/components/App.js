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
import LocalStorageUtils from '../utils/LocalStorageUtils';
import WebAPIUtils from '../utils/WebAPIUtils';

// Data
var ItemDataExample = require('../ItemDataExample');
var ListDataExample = require('../ListDataExample');

// Get Local storage first
// localStorage.clear();
// ListDataExample.init();
// ItemDataExample.init();

// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            currentListID: null,
            listsData: {},
            itemsData: {},
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

        // On app load, check for local storage
        // var hasLocalListStorage = LocalStorageUtils.listGetAll();
        // var hasLocalItemStorage = LocalStorageUtils.itemGetAll();
        var hasLocalListStorage = null;
        var hasLocalItemStorage = null;

        if (hasLocalListStorage) {
            // console.log("Has local storage:", ListStore.getAll());
            this.setState({
                receivedLists: true,
                listsData: ListStore.getAll()
            });
        } else {
            WebAPIUtils.listGetAll().done( () => {
                // console.log("App: List API call done");
                this.setState({
                    receivedLists: true,
                    listsData: ListStore.getAll()
                });
            });
        }

        if (hasLocalItemStorage) {
            // console.log("Has local storage: Items", ItemStore.getAll());
            this.setState({
                receivedItems: true,
                itemsData: ItemStore.getAll()
            });
        } else {
            WebAPIUtils.itemGetAll().done( () => {
                // console.log("App: Item API call done");
                this.setState({
                    receivedItems: true,
                    itemsData: ItemStore.getAll()
                });
            });
        }

        ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    render: function() {

        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            // console.log("Have not received either");
            return (
                <div className="loader">Loading...</div>
            );
        }

        return (
            <div className="app">
                <Header title={"Calculist"} route={this.props.route} />
                { this.props.children }
            </div>
        );
    }
});

export default App;
