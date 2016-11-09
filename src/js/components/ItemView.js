// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Header from './Header';
import Item from './Item';
import ItemAdd from './ItemAdd';
import ItemFilter from './ItemFilter';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    getInitialState: function() {
        // console.log("Initial state");
        return {
            items: ItemStore.getAll(),
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
            items: ItemStore.getAll()
        });
    },

    render: function() {
        var listItems = this.state.items.map(function(listItem, index) {
            return (
                <Item
                    itemProps={listItem}
                    listData={this.state.items}
                    key={listItem.ID}
                />
            );
        }.bind(this))

        return (
            <div className="item-view">
                <Header items={this.state.items} />
                <div className="list-item-scroll">
                    <ItemFilter filter={this.state.filter} items={this.state.items} />
                    <div className="list-container">
                        {listItems}
                    </div>
                    <ItemAdd />
                </div>
                <Footer items={this.state.items} />
            </div>
        );
    }
});

export default ItemView;
