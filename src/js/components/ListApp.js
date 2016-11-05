// Libraries
import React from 'react';

// Components
import Header from './Header';
import ListFilter from './ListFilter';
import ListItem from './ListItem';
import AddListItem from './AddListItem';
import Footer from './Footer';

// Store
import ListStore from '../stores/ListStore';

var app = app || {};

// Application class
const ListApp = React.createClass({

    getInitialState: function() {

        return {
            listsData: ListStore.getAll(),
            filter: "all"
        };
    },

    componentWillMount: function() {
        ListStore.on("change", this.getAllLists);
    },

    componentDidUnmonut: function() {
        ListStore.removeListener("change", this.getAllLists);
    },

    getAllLists: function() {
        this.setState({
            listsData: ListStore.getAll()
        });
    },

    render: function() {
        // var shownTodos = this.state.listsData.lists[0]["items"].filter(function (todo) {
        var shownTodos = this.state.listsData[0]["items"].filter(function (todo) {
            switch (this.state.filter) {
    			case app.UNCHECKED_TODOS:
                    // this.state.listsData[0]["items"] == !todo.checked;
    				return !todo.checked;
    			case app.CHECKED_TODOS:
                    // this.state.listsData[0]["items"] == todo.checked;
    				return todo.checked;
    			default:
                    // this.state.listsData[0]["items"] == todo;
    				return true;
    		}
    	}.bind(this));

        return (
            <div className="app">
                <Header items={this.state.listsData[0]["items"]} />
                <div className="list-scroll">
                    <ListFilter listFilter={this.state.filter} listData={this.state.listsData[0]} />
                    <div className="list">
                        {shownTodos.map(function(listItem, index) {
                            return (
                                <ListItem
                                    listProps={listItem}
                                    listData={this.state.listsData[0]}
                                    key={listItem.id}
                                />
                            );
                        }.bind(this))}
                    </div>
                    <AddListItem />
                </div>
                <Footer listData={this.state.listsData[0]} />
            </div>
        );
    }
});

export default ListApp;
