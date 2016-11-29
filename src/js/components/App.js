// Libraries
import React from 'react';

// Components
import Header from './Header';
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
        var hasLocalListStorage = null;
        // var hasLocalItemStorage = LocalStorageUtils.itemGetAll();
        var hasLocalItemStorage = null;

        if (hasLocalListStorage) {
            console.log("App: Has local storage: Lists");
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
            console.log("Has local storage: Items");
            this.setState({
                receivedItems: true,
                itemsData: ItemStore.getAll()
            });
        } else {
            WebAPIUtils.itemGetAll().done(() => {
                console.log("App: Item API call done");
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
                // console.log("App: Have not received either");
                return (
                    <div className="loader">Loading...</div>
                );
            }

            // Send properties to children
            const childrenWithProps = React.Children.map(this.props.children, child => {

                switch(child.type) {
                    case ListView : {
                        console.log("ListView");
                        return React.cloneElement(child, {
                            listsData: this.state.listsData
                        });
                        break;
                    }
                    case ItemView : {
                        console.log("ItemView");
                        break;
                    }
                    default : {
                        console.log("Default");
                        return child
                    }
                }
            });

        return (
            <div className="app">
                <Header title={"Calculist"} route={this.props.route} />
                {childrenWithProps}
            </div>
        );
    }
});

export default App;
