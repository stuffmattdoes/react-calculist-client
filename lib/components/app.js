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
app.ALL_TODOS = 'all';
app.UNCHECKED_TODOS = 'unchecked';
app.CHECKED_TODOS = 'checked';

// Application class
const App = React.createClass({

    getInitialState: function() {

        return {
            listsData: ListStore.getAll(),
            filter: "all"
        };
    },

    componentWillMount() {
        console.log("Before store change");

        ListStore.on('change', function() {
            console.log("After store change");
            this.setState({
                listsData: ListStore.getAll()
            });
        }.bind(this));
    },

    onChecked: function(value, index) {
        this.state.listsData[0]["items"][index].checked = value;
        this.setState(this.state);
    },

    onAmountChanged: function(value, index) {
        // value = parseFloat(value);   // This disallows entering periods, so gotta find another way
        this.state.listsData[0]["items"][index].amount = value;
        this.setState(this.state);
    },

    onTaxChecked: function(value, index) {
        // console.log("Taxed: ", value);
        this.state.listsData[0]["items"][index].tax.active = value;
        this.setState(this.state);
    },

    onTaxChanged: function(value, index) {
        this.state.listsData[0]["items"][index].tax.singleTaxRate = value;
        this.setState(this.state);
    },

    onUnitPricingChecked: function(value, index) {
        // console.log("Unit pricing: ", value);
        this.state.listsData[0]["items"][index].unitPricing.active = value;
        this.setState(this.state);
    },

    onUnitPricingChanged: function(value, index) {
        // console.log("Unit amount: ", value);
        value = parseFloat(value);
        this.state.listsData[0]["items"][index].unitPricing.price = value;
        this.setState(this.state);
    },

    onUnitQuantityChanged: function(value, index) {
        // console.log("Unit quantity: ", value);
        value = parseInt(value);
        this.state.listsData[0]["items"][index].unitPricing.quantity = value;
        this.setState(this.state);
    },

    onListItemDelete: function(index) {
        // console.log("Delete list item: ", value);
        this.state.listsData[0]["items"].splice(index, 1);
        this.setState(this.state);
    },

    filterLists: function(filter) {
        this.state.filter = filter;
        this.setState(this.state);
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
                <ListFilter listFilter={this.state.filter} listData={this.state.listsData[0]} onFilterClick={this.filterLists} />
                <div className="list">
                    {shownTodos.map(function(listItem, index) {
                        return (
                            <ListItem
                                listProps={listItem}
                                listData={this.state.listsData[0]}
                                onChecked={function(value) {this.onChecked(value, index)}.bind(this)}
                                onAmountChanged={function(value) {this.onAmountChanged(value, index)}.bind(this)}
                                onTaxChecked={function(value) {this.onTaxChecked(value, index)}.bind(this)}
                                onTaxChanged={function(value) {this.onTaxChanged(value, index)}.bind(this)}
                                onUnitPricingChecked={function(value) {this.onUnitPricingChecked(value, index)}.bind(this)}
                                onUnitPricingChanged={function(value) {this.onUnitPricingChanged(value, index)}.bind(this)}
                                onUnitQuantityChanged={function(value) {this.onUnitQuantityChanged(value, index)}.bind(this)}
                                onListItemDelete={function() {this.onListItemDelete(index)}.bind(this)}
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

export default App;
