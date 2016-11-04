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

    componentWillMount() {
        ListStore.on("change", this.getAllLists);
        console.log("Render");
    },

    componentDidUnmonut() {
        ListStore.removeListener("change", this.getAllLists);
        console.log("Re-render");
    },

    getAllLists: function() {
        // console.log("Change listener");
        // console.log(this.state.listsData[0]["items"]);
        this.setState({
            listsData: ListStore.getAll()
        });

        // console.log(this.state.listsData);
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
                <Footer listData={this.state.listsData[0]} />
            </div>
        );
    }
});

export default ListApp;
