// Libraries
import React from 'react';

// Components
import Header from './Header';
import ListFilter from './ListFilter';
import ListItem from './ListItem';
import AddListItem from './AddListItem';
import Footer from './Footer';

// Data
import ListsData from '../data/lists'

var app = app || {};
var nextId = ListsData.lists[0].nextId;
app.ALL_TODOS = 'all';
app.UNCHECKED_TODOS = 'unchecked';
app.CHECKED_TODOS = 'checked';

// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            listsData: ListsData,
            filter: "all"
        };
    },

    onAddListItem: function(title) {
        this.state.listsData.lists[0]["items"].push({
            title: title,
            checked: false,
            amount: 0.00,
            taxed: false,
            id: nextId
        });
        this.setState(this.state);
        // console.log("List item added: ", title);
        nextId ++;
    },

    onChecked: function(value, index) {
        // console.log("Checked: ", value, index);
        this.state.listsData.lists[0]["items"][index].checked = value;
        this.setState(this.state);
    },

    onAmountChanged: function(value, index) {
        value = parseFloat(value);
        this.state.listsData.lists[0]["items"][index].amount = value;
        this.setState(this.state);
        // console.log(this.state.lists[0]["items"][index].amount);
    },

    onTaxedChanged: function(value, index) {
        // console.log("Taxed: ", index, value);
        this.state.listsData.lists[0]["items"][index].taxed = value;
        this.setState(this.state);
    },

    onUnitPricingChanged: function(value, index) {
        // console.log("Unit pricing: ", index, value);
        this.state.listsData.lists[0]["items"][index].unitPricing.active = value;
        this.setState(this.state);
    },

    onListItemDelete: function(index) {
        this.state.listsData.lists[0]["items"].splice(index, 1);
        this.setState(this.state);
    },

    filterLists: function(filter) {
        this.state.filter = filter;
        this.setState(this.state);
        // console.log("Filter: ", this.state.filter);
    },

    render: function() {
        var shownTodos = this.state.listsData.lists[0]["items"].filter(function (todo) {
            switch (this.state.filter) {
    			case app.UNCHECKED_TODOS:
                    // console.log(!todo.checked);
                    // this.state.listsData.lists[0]["items"] == !todo.checked;
    				return !todo.checked;
    			case app.CHECKED_TODOS:
                    // console.log(todo.checked);
                    // this.state.listsData.lists[0]["items"] == todo.checked;
    				return todo.checked;
    			default:
                    // console.log(todo);
                    // this.state.listsData.lists[0]["items"] == todo;
    				return true;
    		}
    	}.bind(this));

        return (
            <div className="app">
                <Header items={this.state.listsData.lists[0]["items"]} />
                <ListFilter listFilter={this.state.filter} listData={this.state.listsData} onFilterClick={this.filterLists} />
                <div className="list">
                    {shownTodos.map(function(listItem, index) {
                        return (
                            <ListItem
                                listProps={listItem}
                                onChecked={function(checked) {this.onChecked(checked, index)}.bind(this)}
                                onAmountChange={function(amount) {this.onAmountChanged(amount, index)}.bind(this)}
                                onTaxedChanged={function(checked) {this.onTaxedChanged(checked, index)}.bind(this)}
                                onUnitPricingChanged={function(checked) {this.onUnitPricingChanged(checked, index)}.bind(this)}
                                onListItemDelete={function() {this.onListItemDelete(index)}.bind(this)}
                                key={listItem.id}
                            />
                        );
                    }.bind(this))}
                </div>
                <AddListItem onAdd={this.onAddListItem} />
                <Footer items={this.state.listsData.lists[0]["items"]} />
            </div>
        );
    }
});

export default App;
