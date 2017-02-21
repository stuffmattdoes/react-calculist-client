// Libraries
import React from 'react';
import { browserHistory } from 'react-router';

// Actions
import ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';

const ListSettings = React.createClass({

    propTypes: {
        currentList: React.PropTypes.object,

        // Passing up
        toggleSettings: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            currentList: ListStore.getCurrentList(),
            title: ListStore.getCurrentList().title
        };
    },

    onListDelete: function() {
        browserHistory.push('/lists/');
        ListActions.resetListView();
        ListActions.listDelete(this.props.currentList.listID);
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
            ListActions.listUpdate(
                this.props.currentList.listID,
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
                    <form onSubmit={this.onSubmit} className="form-standard">
                        <label
                            htmlFor="list-title"
                            className="label-standard label-standard-light"
                        >
                            List Title
                        </label>
                        <input
                            id="list-title"
                            className="input-standard input-standard-large input-standard-light"
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
                        className="button button-outline"
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
