// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Item from './Item';
import Filter from './Filter';
import ListItemAdd from './ListItemAdd';

// Actions
// import ListActions from '../actions/ListActions';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    getInitialState: function() {
        // console.log(ItemStore.getAll());
        // ListActions.setCurrentList(this.props.params.listID);
        return this.getStateFromStores();
    },

    componentWillMount: function() {
        ItemStore.on("CHANGE_ITEM", this.onStoreChange);
    },

    componentDidMount: function() {
        // ListActions.setCurrentList(this.props.params.listID);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
    },

    getStateFromStores: function() {
        return {
            items: ItemStore.getAllForCurrentList(true),
            itemsCount: ItemStore.getCurrentListItemCount(),
            currentFilter: ItemStore.getCurrentFilter()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    render: function() {
        var listItems = this.state.items.map((listItem, index) => {
            return (
                <Item
                    itemProps={listItem}
                    key={listItem.itemID}
                />
            );
        });

        return (
            <div className="item-view">
                <div className="list-item__scroll">
                    <Filter filter={this.state.currentFilter} itemsCount={this.state.itemsCount} />
                    <div className="list-item__container">
                        {listItems.length > 0 ? listItems : null}
                    </div>
                    <ListItemAdd
                        condActions={"ItemActions"}
                    />
                </div>
                <Footer items={this.state.items} />
            </div>            
        );
    }
});

export default ItemView;
