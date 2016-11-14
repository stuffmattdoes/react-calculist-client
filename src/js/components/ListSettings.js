// Libraries
import React from 'react';

// Actions
import * as ListActions from '../actions/ListActions';

const ListSettings = React.createClass({

    propTypes: {
        currentList: React.PropTypes.object.isRequired,

        // Passing up
        toggleSettings: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            title: this.props.currentList.title
        };
    },

    toggleSettings: function() {
        this.props.toggleSettings();
    },

    onSubmit: function(e) {
        e.preventDefault();
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;

        console.log(this.props.currentList.ID);

        this.setState({
            title: inputValue
        });
    },

    onTitleSave: function(e) {
        const inputValue = e.target.value;

        if (inputValue.trim() != "") {
            ListActions.default.listUpdateTitle(
                this.props.currentList.ID,
                this.state.title
            );
        }
        this.setState({
            title: inputValue
        });
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

                </div>
            </div>
        );
    }
});

export default ListSettings;
