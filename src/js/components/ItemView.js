// Libraries
import React from 'react';

// Components
import Footer from './Footer';
import Header from './Header';
import Item from './Item';
import ItemFilter from './ItemFilter';
import ListItemAdd from './ListItemAdd';
import ListSettings from './ListSettings';
import ListView from './ListView';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    propTypes: {
        itemsData: React.PropTypes.array,
        routeParams: React.PropTypes.object
    },

    getInitialState: function() {
        // console.log("ItemView: getInitialState", this.props.itemsData);
        return this.getStateFromStores();
    },

    componentWillMount: function() {
        // ListStore.on("CHANGE_LIST", this.getStateFromStores);
        ItemStore.on("CHANGE_ITEM", this.onStoreChange);
    },

    componentWillUnmount: function() {
        // ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
        ItemStore.removeListener("CHANGE_ITEM", this.onStoreChange);
    },

    getStateFromStores: function() {
        console.log("ItemView: getStateFromStores");
        return {
            itemsData: ItemStore.getAllForCurrentList(true),
            itemsCount: ItemStore.getCurrentListItemCount(),
            currentFilter: ItemStore.getCurrentFilter(),
            currentList: ListStore.getCurrentList(),
            listOptions: true
        };
    },

    onStoreChange: function() {
        // console.log(this.state.itemsData);
        this.setState(this.getStateFromStores());
    },

    toggleSettings: function() {
        this.setState({
            listOptions: !this.state.listOptions
        })
    },

    render: function() {
        console.log("Render");
        var listItems = this.state.itemsData.map((listItem, index) => {
            return (
                <Item
                    itemProps={listItem}
                    key={listItem.ID}
                />
            );
        });

        return (
            this.state.listOptions ?
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
            :
                <ListSettings
                    currentList={this.state.currentList}
                    toggleSettings={this.toggleSettings}
                />
        );
    }
});

export default ItemView;
