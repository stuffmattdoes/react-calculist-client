// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// Actions
import ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';

const ENTER_KEY_CODE = 13;

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
        hashHistory.push('/lists/');
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

    onInputKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            e.target.blur();
        }
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
        hashHistory.push('/lists/' + this.props.params.listID + '/');
        this.props.toggleSettings();
    },

    render: function() {
        return (
            <div className="list-options">
                <div className="list-options__header">
                    <div
                        className="header__left-button"
                        onClick={this.toggleSettings}
                    >
                        <svg className="icon icon-arrow_back"><use href="./svg/svg-defs.svg#icon-arrow_back"></use></svg>
                    </div>
                    <form className="form-standard" onSubmit={this.onSubmit} >
                        <label
                            htmlFor="list-title"
                            className="form__label form__label--light"
                        >
                            List Title
                        </label>
                        <input
                            id="list-title"
                            className="form__input form__input--large form__input--light"
                            type="text"
                            value={this.state.title}
                            onBlur={this.onTitleSave}
                            onChange={this.onTitleChange}
                            onKeyDown={this.onInputKeyDown}
                        />
                        <input
                            className="input--hidden"
                            type="submit"
                        />
                    </form>
                </div>
                <div
                    className="list-options__container"
                >
                    <div className="align--right">
                        <div
                            className="button button--text button--text-warning"
                            onClick={this.onListDelete}
                        >
                            Delete List
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ListSettings;
