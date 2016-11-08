// Libraries
import React from 'react';

// Components
import ItemView from './ItemView';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

var app = app || {};

// Application class
const AppContainer = React.createClass({

    getInitialState: function() {

        return {
            itemsData: ItemStore.getAll(),
            filter: "all"
        };
    },

    componentWillMount: function() {
        ItemStore.on("change", this.getAllItems);
    },

    componentDidUnmonut: function() {
        ItemStore.removeListener("change", this.getAllItems);
    },

    getAllItems: function() {
        this.setState({
            itemsData: ItemStore.getAll()
        });
    },

    render: function() {

        return (
            <div className="app">
                <ItemView />
            </div>
        );
    }
});

export default AppContainer;
