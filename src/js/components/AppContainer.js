// Libraries
import React from 'react';

// Components
import ItemView from './ItemView';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

// Application class
const AppContainer = React.createClass({

    getInitialState: function() {
        return {
            currentList: ListStore.getCurrentListID()
        };
    },

    getStateFromStores: function() {
        // console.log("AppContainer: getStateFromStores");
        this.setState({
            currentList: ListStore.getCurrentListID()
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
                {this.state.currentList == null ?
                    <ListView />
                :
                    <ItemView />
                }
            </div>
        );
    }
});

export default AppContainer;
