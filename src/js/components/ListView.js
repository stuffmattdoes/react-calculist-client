// Libraries
import React from 'react';

// Components
import ListAdd from './ListAdd';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';

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
                            return (
                                <div
                                    className="list-item"
                                    key={list.ID}
                                    onClick={function() {this.onListClick(list.ID);}.bind(this)}
                                >
                                    <p>{list.title}</p>
                                    <div
                                        className="list-item-options-button"
                                        onClick={this.onOptionsExpand}
                                    >
                                        <div className="icon-dots-vertical"></div>
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
