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

// Stores
import ItemStore from '../stores/ItemStore';
import ListStore from '../stores/ListStore';

const ItemView = React.createClass({

    propTypes: {
        itemsData: React.PropTypes.array
    },

    getInitialState: function() {
        console.log(this.props.itemsData);
        return {
            // itemsData: ItemStore.getAllForCurrentList(true),
            currentFilter: ItemStore.getCurrentFilter(),
            currentList: ListStore.getCurrentList(),
            listOptions: true
        };
    },

    componentWillMount: function() {
        ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
    },

    getStateFromStores: function() {
        console.log("ItemView: getStateFromStores");
        this.setState({
            // items: ItemStore.getAllForCurrentList(true),
            currentFilter: ItemStore.getCurrentFilter(),
            currentList: ListStore.getCurrentList(),
            listOptions: true
        });
    },

    toggleSettings: function() {

        this.setState({
            listOptions: !this.state.listOptions
        })
    },

    render: function() {
        console.log("ItemView: render");
        var listItems = this.props.itemsData.map((listItem, index) => {
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
                        <ItemFilter filter={this.state.currentFilter} />
                        <div className="list-container">
                            {listItems.length > 0 ? listItems : null}
                        </div>
                        <ListItemAdd condActions={"ItemActions"}/>
                    </div>
                    <Footer items={this.props.itemsData} />
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
