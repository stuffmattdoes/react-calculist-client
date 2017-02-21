// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Item from './Item';
import ItemFilter from './ItemFilter';
import ListItemAdd from './ListItemAdd';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    getInitialState: function() {
        return this.getStateFromStores();
    },

    componentWillMount: function() {
        ItemStore.on("CHANGE_ITEM", this.onStoreChange);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
    },

    getStateFromStores: function() {
        return {
            itemsData: ItemStore.getAllForCurrentList(true),
            itemsCount: ItemStore.getCurrentListItemCount(),
            currentFilter: ItemStore.getCurrentFilter()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    render: function() {
        var listItems = this.state.itemsData.map((listItem, index) => {
            return (
                <Item
                    itemProps={listItem}
                    key={listItem.itemID}
                />
            );
        });

        return (
            <div className="item-view">
                <div className="list-item-scroll">
                    <ItemFilter filter={this.state.currentFilter} itemsCount={this.state.itemsCount} />
                    <div className="list-container">
                        {listItems.length > 0 ? listItems : null}
                    </div>
                    <ListItemAdd
                        condActions={"ItemActions"}
                    />
                </div>
                <Footer items={this.state.itemsData} />
            </div>            
        );
    }
});

export default ItemView;
