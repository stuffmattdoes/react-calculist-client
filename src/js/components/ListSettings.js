// Libraries
import React from 'react';
import { browserHistory } from 'react-router';

// Actions
import * as ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';

const ListSettings = React.createClass({

    propTypes: {
        // Passing up
        toggleSettings: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            currentList: ListStore.getCurrentList(),
            title: this.props.currentList.title
        };
    },

    onListDelete: function() {
        browserHistory.push('/lists/');
        ListActions.default.resetListView();
        ListActions.default.listDelete(this.props.currentList.ID);
        this.props.toggleSettings();
    },

    onSubmit: function(e) {
        e.preventDefault();
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onTitleSave: function(e) {
        const inputValue = e.target.value;

        if (inputValue.trim() != "") {
            ListActions.default.listUpdate(
                this.props.currentList.ID,
                {
                    title: this.state.title
                }
            );
        }
        this.setState({
            title: inputValue
        });
    },

    toggleSettings: function() {
        browserHistory.push('/lists/' + this.props.params.listID);
        this.props.toggleSettings();
    },

    render: function() {

        return (
            <div className="list-options">
                <div className="list-options-header">
                    <div
                        className="header-back"
                        onClick={this.toggleSettings}
                    >
                        Back
                    </div>
                    <form onSubmit={this.onSubmit} >
                        <label
                            htmlFor="list-title"
                            className="list-title-label"
                        >
                            List Title
                        </label>
                        <input
                            id="list-title"
                            className="list-title-input"
                            type="text"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                            onBlur={this.onTitleSave}
                        />
                        <input
                            className="input-hidden"
                            type="submit"
                        />
                    </form>
                </div>
                <div
                    className="list-options-container"
                >
                    <p>Settings</p>
                    <div
                        className="button-main button-outline"
                        onClick={this.onListDelete}
                    >
                        Delete List
                    </div>

                </div>
            </div>
        );
    }
});

export default ListSettings;
