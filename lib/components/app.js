// Libraries
import React from 'react';

// Components
import Header from './Header';
import ListItem from './ListItem';
import AddListItem from './AddListItem';
import ListFilter from './ListFilter';

// Data
import ListsData from '../data/lists'

var nextId = ListsData.lists[0].nextId;

// Application class
const App = React.createClass({

    getInitialState: function() {
        return ListsData;
    },

    onAddListItem: function(title) {
        this.state.lists[0]["items"].push({
            title: title,
            amount: 0.00,
            id: nextId
        });
        this.setState(this.state);
        nextId ++;
    },

    onListItemChecked: function(checked) {
        console.log("Checked!");
    },

    onListItemAmountChanged: function(amount) {
        console.log("Amount changed");
    },

    render: function() {

        return (
            <div className="app">
                <Header items={this.state.lists[0]["items"]} />
                <div className="list">
                    {this.state.lists[0]["items"].map(function(listItem, index) {
                        return (
                            <ListItem
                                listProps={listItem}
                                onChecked={this.onListItemChecked}
                                onAmountChange={this.onListItemAmountChanged}
                                key={listItem.id}
                            />
                        );
                    }.bind(this))}
                </div>
                <AddListItem onAdd={this.onAddListItem}/>
                <ListFilter />
            </div>
        );
    }
});

export default App;
