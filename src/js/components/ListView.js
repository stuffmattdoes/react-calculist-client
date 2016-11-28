// Libraries
import React from 'react';

// Components
import Header from './Header';
import ListItemAdd from './ListItemAdd';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

// API
import LocalStorageUtils from '../utils/LocalStorageUtils';
import WebAPIUtils from '../utils/WebAPIUtils';

const ListView = React.createClass({

    onListClick: function(listID) {
        console.log("Click list");
        ListActions.default.listClick(listID);
    },

    getInitialState: function() {
        return {
            currentListID: null,
            listsData: {},
            itemsData: {},
            receivedLists: false,
            receivedItems: false
        };
    },

    getStateFromStores: function() {
        // console.log("Home: getStateFromStores", this.state);
        this.setState({
            currentListID: ListStore.getCurrentListID()
        });
    },

    componentWillMount: function() {

        // On app load, check for local storage
        // var hasLocalListStorage = LocalStorageUtils.listGetAll();
        // var hasLocalItemStorage = LocalStorageUtils.itemGetAll();
        var hasLocalListStorage = null;
        var hasLocalItemStorage = null;

        if (hasLocalListStorage) {
            // console.log("Has local storage:", ListStore.getAll());
            this.setState({
                receivedLists: true,
                listsData: ListStore.getAll()
            });
        } else {
            WebAPIUtils.listGetAll().done( () => {
                // console.log("App: List API call done");
                this.setState({
                    receivedLists: true,
                    listsData: ListStore.getAll()
                });
            });
        }

        if (hasLocalItemStorage) {
            // console.log("Has local storage: Items", ItemStore.getAll());
            this.setState({
                receivedItems: true,
                itemsData: ItemStore.getAll()
            });
        } else {
            WebAPIUtils.itemGetAll().done( () => {
                // console.log("App: Item API call done");
                this.setState({
                    receivedItems: true,
                    itemsData: ItemStore.getAll()
                });
            });
        }

        ItemStore.on("CHANGE_ITEM", this.getStateFromStores);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener("CHANGE_ITEM", this.getStateFromStores);
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    render: function() {
        if (!this.state.receivedLists
            || !this.state.receivedItems) {
            // console.log("Have not received either");
            return (
                <div className="loader">Loading...</div>
            );
        }

        var totalLists = this.state.listsData.map((list, index) => {
            var itemCount = ItemStore.getListItemCount(list.ID).unchecked;

            return (
                <div
                    className="list-item"
                    key={list.ID}
                    onClick={() => {this.onListClick(list.ID);}}
                >
                    <div className="list-item-container">
                        <p className="list-item-title">{list.title}</p>
                        {itemCount > 0 ?
                            <div className="list-count">{itemCount}</div>
                        :
                            null
                            // <div className="checkmark">&#10004;</div>
                        }
                    </div>
                </div>
            );
        });

        return (
            <div className="list-view">
                <div className="list-item-scroll">
                    <div className="list-container">
                        {totalLists}
                    </div>
                <ListItemAdd condActions={"ListActions"}/>
            </div>
        </div>
        );
    }
});

export default ListView;
