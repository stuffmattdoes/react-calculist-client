// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListView from './ListView';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

// API
// import LocalStorageUtils from '../utils/LocalStorageUtils';
import WebAPIUtils from '../utils/WebAPIUtils';

// Application class
const App = React.createClass({

    getInitialState: function() {
        // console.log("App: getInitialState");
        return {
            currentListID: this.checkForCurrentList(),
            listsData: [],
            // itemsData: [],
            receivedLists: false,
            receivedItems: false
        };
    },

    getStateFromStores: function() {
        // console.log("App: getStateFromStores, getCurrentListID");
        return {
            // currentListID: ListStore.getCurrentListID(),
            listsData: ListStore.getAll()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    checkForCurrentList: function() {
        // Check for current List ID
        // console.log("checkForCurrentList, getCurrentListID");
        if (!ListStore.getCurrentListID()
            && this.props.params.listID) {
            // console.log("No list ID", this.props.params);
            ListActions.default.setCurrentList(this.props.params.listID);
        }
    },

    componentWillMount: function() {
        // console.log("App: componentWillMount");
        // On app load, check for local storage
        // var hasLocalListStorage = LocalStorageUtils.listGetAll();
        var hasLocalListStorage = null;
        // var hasLocalItemStorage = LocalStorageUtils.itemGetAll();
        var hasLocalItemStorage = null;

        if (hasLocalListStorage) {
            // console.log("App: Has local storage: Lists");
            this.setState({
                receivedLists: true,
                listsData: ListStore.getAll()
            });
        } else {
            WebAPIUtils.listGetAll().done( () => {
                // console.log("App: List API call done", ListStore.getAll());
                this.setState({
                    receivedLists: true,
                    listsData: ListStore.getAll()
                });
            });
        }

        if (hasLocalItemStorage) {
            // console.log("Has local storage: Items");
            this.setState({
                receivedItems: true,
                // itemsData: ItemStore.getAll()
            });
        } else {
            WebAPIUtils.itemGetAll().done(() => {
                // console.log("App: Item API call done", ItemStore.getAll());
                this.setState({
                    receivedItems: true,
                    // itemsData: ItemStore.getAll()
                });
            });
        }

        // ItemStore.on("CHANGE_ITEM", this.onStoreChange);
        ListStore.on("CHANGE_LIST", this.onStoreChange);
    },

    // componentWillReceiveProps: function(newProps) {
    //     if (newProps.params.listID) {
    //         this.getStateFromStores();
    //         console.log("App: componentWillReceiveProps", newProps.params.listID);
    //     }
    // },

    componentWillUnmount: function() {
        // ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
        ListStore.removeListener("CHANGE_LIST", this.onStoreChange);
    },

    render: function() {
        // Don't wanna render no components if we ain't got all the lists and items
        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            // console.log("App: Have not received either");
            return (
                <div className="loader">Loading...</div>
            );
        };

        // console.log("Render");

        // Send properties to children
        const childrenWithProps = React.Children.map(this.props.children, child => {

            switch(child.type) {
                case ListView : {
                    // console.log("ListView");
                    return React.cloneElement(child, {
                        listsData: this.state.listsData
                    });
                    break;
                }
                case ItemView : {
                    // console.log("ItemView", ItemStore.getAllForCurrentList(true));
                    return React.cloneElement(child, {
                        itemsData: [],
                        routeParams: this.props.params
                    });
                    break;
                }
                default : {
                    // console.log("Default");
                    return child
                }
            }
        });

        return (
            <div className="app">
                <Header
                    title={"Calculist"}
                    route={this.props.route}
                    params={this.props.params}
                    location={this.props.location}
                />
                {childrenWithProps}
            </div>
        );
    }
});

export default App;
