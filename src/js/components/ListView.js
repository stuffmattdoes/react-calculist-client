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

    propTypes: {
        listsData: React.PropTypes.array.isRequired
    },

    onListClick: function(listID) {
        ListActions.default.listClick(listID);
    },

    render: function() {

        var totalLists = this.props.listsData.map((list, index) => {
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
