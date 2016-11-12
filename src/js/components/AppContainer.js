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
            isListView: true
        };
    },

    componentWillMount: function() {
        // console.log(ListStore._currentID);
        // ItemStore.on("change", this.getAllItems);
    },
    //
    // componentDidUnmonut: function() {
    //     ItemStore.removeListener("change", this.getAllItems);
    // },

    render: function() {

        return (
            <div className="app">
                {this.state.isListView ?
                    <ListView />
                :
                    <ItemView />
                }
            </div>
        );
    }
});

export default AppContainer;
