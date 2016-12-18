// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Item from './Item';
import ItemFilter from './ItemFilter';
import ListItemAdd from './ListItemAdd';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    propTypes: {
        itemsData: React.PropTypes.array
    },

    getInitialState: function() {
        // console.log('getInitialState');
        return this.getStateFromStores();
    },

    componentWillMount: function() {
        // console.log('componentWillMount');
        ItemStore.on("CHANGE_ITEM", this.onStoreChange);
    },

    componentWillUnmount: function() {
        // console.log('componentWillUnmount');
        ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
    },

    getStateFromStores: function() {
        // console.log('getStateFromStores');
        return {
            itemsData: ItemStore.getAllForCurrentList(true),
            itemsCount: ItemStore.getCurrentListItemCount(),
            currentFilter: ItemStore.getCurrentFilter()
        };
    },

    onStoreChange: function() {
        // console.log('onStoreChange');
        this.setState(this.getStateFromStores());
    },

    render: function() {
        var listItems = this.state.itemsData.map((listItem, index) => {
            // console.log(listItem);
            return (
                <Item
                    itemProps={listItem}
                    key={listItem.itemID}
                />
            );
        });

        // console.log('render', this.state.itemsData, listItems);

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
