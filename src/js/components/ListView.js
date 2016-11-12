// Libraries
import React from 'react';

// Components
import ListAdd from './ListAdd';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

const ListView = React.createClass({

    getInitialState: function() {
        return {
            listsData: ListStore.getAll()
        };
    },

    componentWillMount: function() {
        console.log("List view mounted");
        ListStore.on("LISTS_CHANGE", this.getAllLists);
    },

    componentWillUnmount: function() {
        console.log("List view unmounted");
        ListStore.removeListener("LISTS_CHANGE", this.getAllLists);
    },

    getAllLists: function() {
        this.setState({
            listsData: ListStore.getAll()
        });
    },

    onListClick: function(listID) {
        ListActions.default.listClick(listID);
    },

    render: function() {

        var totalLists = this.state.listsData.map(function(list, index) {
            var itemCount = ItemStore.getListItemCount(list.ID);
            var listClasses = "list-item";

            return (
                <div
                    className={listClasses}
                    key={list.ID}
                    onClick={function() {this.onListClick(list.ID);}.bind(this)}
                >
                    <div className="list-item-container">
                        <p className="list-item-title">{list.title}</p>
                        {itemCount > 0 ?
                            <div className="list-count">{itemCount}</div>
                        :
                            <div className="checkmark">&#10004;</div>
                        }
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="list-view">
                <div className="list-item-scroll">
                    <div className="list-container">
                        {totalLists}
                    </div>
                <ListAdd />
            </div>
        </div>
        );
    }
});

export default ListView;
