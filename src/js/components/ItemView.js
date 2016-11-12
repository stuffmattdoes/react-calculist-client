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
        return {
            items: ItemStore.getAllForCurrentList(),
            filter: "all"
        };
    },

    componentWillMount: function() {
        console.log("Item view mounted");
        ItemStore.addListener("CHANGE_ITEM", this.getAllItemsFromList);
    },

    componentWillUnmount: function() {
        console.log("Item view unmounted");
        ItemStore.removeListener("CHANGE_ITEM", this.getAllItemsFromList);
    },

    getAllItemsFromList: function() {
        this.setState({
            items: ItemStore.getAllForCurrentList()
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
