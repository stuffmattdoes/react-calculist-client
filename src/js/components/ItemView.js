// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// Components
import Footer from './Footer';
import Header from './Header';
import Item from './Item';
import Filter from './Filter';
import AddItem from './AddItem';

// Actions
// import ListActions from '../actions/ListActions';

// Stores
import ItemStore from '../stores/ItemStore';
// import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    getInitialState: function() {
        // ListActions.setCurrentList(this.props.params.listID);
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
            currentFilter: ItemStore.getCurrentFilter()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    toggleListSettings: function(e) {
        e.preventDefault();
        hashHistory.push(this.props.location.pathname + 'settings/');
    },

    navBack: function(e) {
        e.preventDefault();
        hashHistory.push('/lists/');
    },

    render: function() {
        let items = ItemStore.getAllForCurrentList();
        let currentFilter = ItemStore.getCurrentFilter();

        let listItems = items.filter((listItem) => {
            switch (currentFilter) {
                case 'SHOW_ALL' :
                    return listItem;
                    break;
                case 'SHOW_INCOMPLETE' :
                    return !listItem.checked;
                    break;
                case 'SHOW_COMPLETE' :
                    return listItem.checked;
                    break;
            }
        }).map((listItem, index) => {
            return (
                <Item
                    itemProps={ listItem }
                    key={ listItem.itemID }
                />
            );
        });

        return (
            <div className="item-view">
                <Header
                    title="Calculist"
                    buttonLeft={this.navBack}
                    buttonRight={this.toggleListSettings}
                />
                <div className="list__scroll">
                    <Filter filter={ currentFilter } />
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
