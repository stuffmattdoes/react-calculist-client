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
