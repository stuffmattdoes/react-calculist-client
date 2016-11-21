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

const ListView = React.createClass({

    getInitialState: function() {
        return {
            listsData: {}
        };
    },

    componentWillMount: function() {
        this.getStateFromStores();
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    getStateFromStores: function() {
        // console.log("ListView: getStateFromStores", this.state.listsData);
        this.setState({
            listsData: ListStore.getAll()
        }, function() {
            // console.log("ListView: getStateFromStores callback", this.state.listsData);
        });
    },

    onListClick: function(listID) {
        ListActions.default.listClick(listID);
    },

    render: function() {

        var totalLists = this.state.listsData.map(function(list, index) {
            var itemCount = ItemStore.getListItemCount(list.ID).unchecked;
            // var itemCount = 0;

            return (
                <div
                    className="list-item"
                    key={list.ID}
                    onClick={function() {this.onListClick(list.ID);}.bind(this)}
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
        }.bind(this));

        return (
            <div className="list-view">
                <Header title={"Calculist"} />
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
