// Libraries
import React from 'react';

// Components
import AddItem from './AddItem';
import Footer from './Footer';
import Header from './Header';
import ItemView from './ItemView';
import ItemFilter from './ItemFilter';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

var app = app || {};

// Application class
const ListApp = React.createClass({

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
                <ListView />
            </div>
        );
    }
});

export default ListApp;
