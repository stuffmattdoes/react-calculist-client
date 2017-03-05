// Libraries
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6


// Components
import Footer from './Footer';
import Item from './Item';
import Filter from './Filter';
import AddItem from './AddItem';

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
            <ReactCSSTransitionGroup
                transitionName="view__items"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <div className="view__items">
                    <div className="list__scroll">
                        <Filter filter={this.state.currentFilter} itemsCount={this.state.itemsCount} />
                        <div className="list__container">
                            {listItems.length > 0 ? listItems : null}
                        </div>
                        <AddItem
                            condActions={"ItemActions"}
                        />
                    </div>
                    <Footer items={this.state.items} />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
});

export default ItemView;
