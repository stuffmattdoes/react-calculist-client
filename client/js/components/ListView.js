// Libraries
import React from 'react';

// Components
import ListItemAdd from './ListItemAdd';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

const ListView = React.createClass({

    getInitialState: function() {
        return this.getStateFromStores();
    },

    getStateFromStores: function() {
        return {
            lists: ListStore.getAll()
        }
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    onListClick: function(listID) {
        ListActions.default.setCurrentList(listID);
        this.props.router.push('/lists/' + listID);
    },

    componentWillMount: function() {
        ListStore.on('CHANGE_LIST', this.onStoreChange);
    },

    componentWillUnmount: function() {
        ListStore.removeListener('CHANGE_LIST', this.onStoreChange);
    },

    render: function() {
        var totalLists = this.state.lists.map((list, index) => {
            var itemCount = ItemStore.getListItemCount(list.listID).unchecked;

            return (
                <div
                    className="list-item"
                    key={list.listID}
                    onClick={() => {this.onListClick(list.listID);}}
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
                        {totalLists.length > 0 ? totalLists : null}
                    </div>
                    <ListItemAdd condActions={"ListActions"} />
                </div>
            </div>
        );
    }
});

export default ListView;
