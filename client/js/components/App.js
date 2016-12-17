// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListSettings from './ListSettings';
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
        return {
            // currentListID: this.checkForCurrentList(),
            currentListID: null,
            listsData: [],
            // currentList: ListStore.getCurrentList(),
            currentList: null,
            receivedLists: false,
            receivedItems: false,
            ListSettingsActive: false
        };
    },

    getStateFromStores: function() {
        return {
            currentListID: ListStore.getCurrentListID(),
            listsData: ListStore.getAll(),
            currentList: ListStore.getCurrentList()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    checkForCurrentList: function() {
        // Check for current List ID
        if (!ListStore.getCurrentListID()
            && this.props.params.listID) {
            ListActions.default.setCurrentList(this.props.params.listID);
            return ListStore.getCurrentListID();
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
            this.setState({
                receivedLists: true,
                listsData: ListStore.getAll()
            });
        } else {
            // console.log("listGetAll pre");
            WebAPIUtils.listGetAll().done( () => {
                // console.log("listGetAll", ListStore.getAll());
                this.setState({
                    receivedLists: true,
                    listsData: ListStore.getAll()
                });
            });
        }

        if (hasLocalItemStorage) {
            this.setState({
                receivedItems: true,
                // itemsData: ItemStore.getAll()
            });
        } else {
            WebAPIUtils.itemGetAll().done(() => {
                // console.log("itemGetAll", ItemStore.getAll());
                this.setState({
                    receivedItems: true,
                    itemsData: ItemStore.getAll()
                });
            });
        }

        ListStore.on("CHANGE_LIST", this.onStoreChange);
    },

    componentWillUnmount: function() {
        ListStore.removeListener("CHANGE_LIST", this.onStoreChange);
    },

    toggleSettings: function() {
        // console.log("Toggle list settings");
        this.setState({
            ListSettingsActive: !this.state.ListSettingsActive
        })
    },

    render: function() {
        // Don't wanna render no components if we ain't got all the lists and items
        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            return (
                <div className="loader">Loading...</div>
            );
        };

        console.log(this.state.listsData);
        
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
                        itemsData: [],
                        routeParams: this.props.params
                    });
                    break;
                }
                case ListSettings : {
                    // console.log("ListSettings");
                    return React.cloneElement(child, {
                        currentList: this.state.currentList,
                        toggleSettings: this.toggleSettings
                    });
                }
                default : {
                    return child
                }
            }
        });

        return (
            <div className="app">
                {!this.state.ListSettingsActive ?
                    <Header
                        title={"Calculist"}
                        route={this.props.route}
                        params={this.props.params}
                        location={this.props.location}
                        toggleSettings={this.toggleSettings}
                    />
                : null}
                {childrenWithProps}
            </div>
        );
    }
});

export default App;
