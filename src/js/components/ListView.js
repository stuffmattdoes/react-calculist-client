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
        listsData: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            currentListID: null,
        };
    },

    componentWilMount: function() {
        // console.log(this.props.listsData);
        ListStore.on("CHANGE_LIST", this.getStateFromStores);
    },

    componentWillUnmount: function() {
        ListStore.removeListener("CHANGE_LIST", this.getStateFromStores);
    },

    getStateFromStores: function() {
        // console.log("Home: getStateFromStores", this.state);
        this.setState({
            currentListID: ListStore.getCurrentListID()
        });
    },

    onListClick: function(listID) {
        ListActions.default.listClick(listID);
        this.props.router.push('/lists/' + listID);
    },

    render: function() {
        // console.log(this.props.params.listID);

        var totalLists = this.props.listsData.map((list, index) => {
            var itemCount = ItemStore.getListItemCount(list.ID).unchecked;
            // var itemCount = 0;

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
                        {totalLists.length > 0 ? totalLists : null}
                    </div>
                    <ListItemAdd condActions={"ListActions"}/>
                </div>
            </div>
        );
    }
});

export default ListView;
