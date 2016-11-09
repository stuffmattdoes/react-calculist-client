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
        ListStore.on("LISTS_CHANGE", this.getAllLists);
    },

    componentDidUnmonut: function() {
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
        return (
            <div className="list-view">
                <div className="list-item-scroll">
                    <div className="list-container">
                        {this.state.listsData.map(function(list, index) {
                            var itemCount = ItemStore.getListItemCount(list.ID);

                            return (
                                <div
                                    className="list-item"
                                    key={list.ID}
                                    onClick={function() {this.onListClick(list.ID);}.bind(this)}
                                >
                                    <div className="list-item-container">
                                        <p>{list.title}</p>
                                        {itemCount > 0 ?
                                        <div className="list-count">{itemCount}</div>
                                        : <div className="checkmark">&#10004;</div>
                                        }
                                    </div>
                                </div>
                            );
                        }.bind(this))}
                    </div>
                <ListAdd />
            </div>
        </div>
        );
    }
});

export default ListView;
