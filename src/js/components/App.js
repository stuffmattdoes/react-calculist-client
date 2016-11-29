// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListView from './ListView';

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
            currentListID: null,
            listsData: {},
            // itemsData: {},
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
                console.log("App: List API call done");
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
                console.log("App: Item API call done");
                this.setState({
                    receivedItems: true,
                    // itemsData: ItemStore.getAll()
                });
            });
        }

        // ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.params.listID) {
            this.getStateFromStores();
            // console.log("App: componentWillReceiveProps", newProps.params.listID);
        }
    },

    componentWillUnmount: function() {
        // ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    render: function() {

        // Don't wanna render no components if we ain't got all the lists and items
        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            // console.log("App: Have not received either");
            return (
                <div className="loader">Loading...</div>
            );
        }

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
                    // console.log("ItemView");
                    return React.cloneElement(child, {
                        itemsData: ItemStore.getAllForCurrentList()
                    });
                    break;
                }
                default : {
                    // console.log("Default");
                    return child
                }
            }
        });

        // console.log(this.props.params.listID);

        return (
            <div className="app">
                <Header title={"Calculist"} route={this.props.route} params={this.props.params} location={this.props.location} />
                {childrenWithProps}
            </div>
        );
    }
});

export default App;
