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

// Utils
import AuthUtils from '../utils/AuthUtils';
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

        // localStorage.clear();
        // Check browser localStorage for token
        // AuthUtils.checkForToken();

        // WebAPIUtils.tokenRefresh().done( () => {
        //     console.log('token refresh done!');
        // });

        // Get list & item data
         WebAPIUtils.listGetAll().done( () => {
            this.setState({
                receivedLists: true,
                listsData: ListStore.getAll()
            });
        });

        WebAPIUtils.itemGetAll().done(() => {
            this.setState({
                receivedItems: true,
                itemsData: ItemStore.getAll()
            });
        });

        ListStore.on("CHANGE_LIST", this.onStoreChange);
    },

    componentWillUnmount: function() {
        ListStore.removeListener("CHANGE_LIST", this.onStoreChange);
    },

    toggleSettings: function() {
        this.setState({
            ListSettingsActive: !this.state.ListSettingsActive
        });
    },

    render: function() {
        // Don't wanna render no components if we ain't got all the lists and items
        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            return (
                <div className="loader">Loading...</div>
            );
        };
        
        // Send properties to children
        const childrenWithProps = React.Children.map(this.props.children, child => {

            switch(child.type) {
                case ListView : {
                    return React.cloneElement(child, {
                        listsData: this.state.listsData
                    });
                    break;
                }
                case ItemView : {
                    return React.cloneElement(child, {
                        itemsData: [],
                        routeParams: this.props.params
                    });
                    break;
                }
                case ListSettings : {
                    return React.cloneElement(child, {
                        currentList: this.state.currentList,
                        toggleSettings: this.toggleSettings
                    });
                }
            }
        });

        return (
            <div className="app">
                {!this.state.ListSettingsActive ?
                    <Header
                        title={this.state.currentList ? this.state.currentList.title : 'Calculist'}
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
