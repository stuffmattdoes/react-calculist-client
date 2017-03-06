// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Item from './Item';
import Filter from './Filter';
import AddItem from './AddItem';

// Actions
// import ListActions from '../actions/ListActions';

// Stores
import ItemStore from '../stores/ItemStore';
// import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    // getInitialState: function() {
    //     console.log(this);
    //     console.log(ItemStore.getAll());
    //     ListActions.setCurrentList(this.props.params.listID);
    //     return this.getStateFromStores();
    // },

    // componentWillMount: function() {
    //     ItemStore.on("CHANGE_ITEM", this.onStoreChange);
    // },

    // componentWillUnmount: function() {
    //     ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
    // },

    // getStateFromStores: function() {
    //     return {
    //         items: ItemStore.getAllForCurrentList(true),
    //         itemsCount: ItemStore.getCurrentListItemCount(),
    //         currentFilter: ItemStore.getCurrentFilter()
    //     };
    // },

    // onStoreChange: function() {
    //     this.setState(this.getStateFromStores());
    // },

    render: function() {
        let items = ItemStore.getAllForCurrentList();

        let listItems = items.map((listItem, index) => {
            return (
                <Item
                    itemProps={ listItem }
                    key={ listItem.itemID }
                />
            );
        });

        return (
            <div className="item-view">
                <div className="list__scroll">
                    <Filter />
                    <div className="list__container">
                        { listItems }
                    </div>
                    <AddItem
                        condActions={"ItemActions"}
                    />
                </div>
                <Footer items={ items } />
            </div>            
        );
    }
});

export default ItemView;
