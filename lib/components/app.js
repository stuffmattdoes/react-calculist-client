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
            tax: {
                active: false,
                singleTaxRate: 0.0
            },
            unitPricing: {
                active: false,
                price: 0.00,
                quantity: 0
            },
            id: nextId
        });
        this.setState(this.state);
        nextId ++;
    },

    onChecked: function(value, index) {
        this.state.listsData.lists[0]["items"][index].checked = value;
        this.setState(this.state);
    },

    onAmountChanged: function(value, index) {
        value = parseFloat(value);
        this.state.listsData.lists[0]["items"][index].amount = value;
        this.setState(this.state);
    },

    onTaxChecked: function(value, index) {
        this.state.listsData.lists[0]["items"][index].tax.active = value;
        this.setState(this.state);
    },

    onUnitPricingChecked: function(value, index) {
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
    },

    render: function() {
        var shownTodos = this.state.listsData.lists[0]["items"].filter(function (todo) {
            switch (this.state.filter) {
    			case app.UNCHECKED_TODOS:
                    // this.state.listsData.lists[0]["items"] == !todo.checked;
    				return !todo.checked;
    			case app.CHECKED_TODOS:
                    // this.state.listsData.lists[0]["items"] == todo.checked;
    				return todo.checked;
    			default:
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
                                listData={this.state.listsData.lists[0]}
                                onChecked={function(checked) {this.onChecked(checked, index)}.bind(this)}
                                onAmountChange={function(amount) {this.onAmountChanged(amount, index)}.bind(this)}
                                onTaxChecked={function(checked) {this.onTaxChecked(checked, index)}.bind(this)}
                                onUnitPricingChecked={function(checked) {this.onUnitPricingChecked(checked, index)}.bind(this)}
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
