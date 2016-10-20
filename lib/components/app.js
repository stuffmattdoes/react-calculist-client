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

var nextId = ListsData.lists[0].nextId;

// Application class
const App = React.createClass({

    getInitialState: function() {
        return ListsData;
    },

    onAddListItem: function(title) {
        this.state.lists[0]["items"].push({
            title: title,
            checked: false,
            amount: 0.00,
            taxed: false,
            id: nextId
        });
        this.setState(this.state);
        console.log("List item added: ", title);
        nextId ++;
    },

    onChecked: function(value, index) {
        // console.log("Checked: ", value, index);
        this.state.lists[0]["items"][index].checked = value;
        this.setState(this.state);
    },

    onAmountChanged: function(value, index) {
        value = parseFloat(value);
        this.state.lists[0]["items"][index].amount = value;
        this.setState(this.state);
        console.log(this.state.lists[0]["items"][index].amount);
    },

    render: function() {

        return (
            <div className="app">
                <Header items={this.state.lists[0]["items"]} />
                <ListFilter />
                <div className="list">
                    {this.state.lists[0]["items"].map(function(listItem, index) {
                        return (
                            <ListItem
                                listProps={listItem}
                                onChecked={function(checked) {this.onChecked(checked, index)}.bind(this)}
                                onAmountChange={function(amount) {this.onAmountChanged(amount, index)}.bind(this)}
                                key={listItem.id}
                            />
                        );
                    }.bind(this))}
                </div>
                <AddListItem onAdd={this.onAddListItem} />
                <Footer items={this.state.lists[0]["items"]} />
            </div>
        );
    }
});

export default App;
