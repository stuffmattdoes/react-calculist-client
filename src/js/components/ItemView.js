// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Header from './Header';
import Item from './Item';
import ItemFilter from './ItemFilter';
import ListItemAdd from './ListItemAdd';
import ListView from './ListView';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    getInitialState: function() {
        return {
            filter: "all",
            items: ItemStore.getAllForCurrentList(),
            currentList: ListStore.getCurrentList()
        };
    },

    componentWillMount: function() {
        ItemStore.addListener("CHANGE_ITEM", this.getAllItemsFromList);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getAllItemsFromList);
    },

    getAllItemsFromList: function() {
        this.setState({
            items: ItemStore.getAllForCurrentList(),
            currentList: ListStore.getCurrentList()
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
                <Header navBack={true} title={this.state.currentList.title} />
                <div className="list-item-scroll">
                    <ItemFilter filter={this.state.filter} items={this.state.items} />
                    <div className="list-container">
                        {listItems}
                    </div>
                    <ListItemAdd condActions={"ItemActions"}/>
                </div>
                <Footer items={this.state.items} />
            </div>
        );
    }
});

export default ItemView;
