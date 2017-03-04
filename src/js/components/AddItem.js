import React from 'react';

// Actions
import ListActions from '../actions/ListActions';
import ItemActions from '../actions/ItemActions';

// Stores
import AuthStore from '../stores/AuthStore';
import ListStore from '../stores/ListStore';

const ENTER_KEY_CODE = 13;

const AddItem = React.createClass({

    propTypes: {
        condActions: React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        let addText = '';

        if (this.props.condActions == 'ListActions') {
            addText = 'Add New List'
        } else if (this.props.condActions == 'ItemActions') {
            addText = 'Add New Item';
        }

        return {
            title: '',
            isEditing: false,
            addText: addText
        }
    },

    onInputBlur: function() {
        if (this.state.title.trim() == '') {
            this.onReset();
        }
    },

    onInputChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue,
            isEditing: true
        });
    },

    onInputKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            e.target.blur();
            this.onSubmit(e);
        }
    },

    onInputFocus: function(value) {
        this.setState({
            isEditing: true
        });
    },

    onReset: function(e) {
        if (e) {
            e.preventDefault();
        }

        if (!this.state.isEditing) {
            return;
        }

        this.setState({
            title: '',
            isEditing: false
        });
    },

    onSubmit: function(e) {
        e.preventDefault();
        if (this.state.title.trim() != '') {

            // Create a new list
            if (this.props.condActions == 'ListActions') {
                ListActions.listCreate(
                    this.state.title,
                    AuthStore.getUser()._id
                );

            // Create a new item
            } else if (this.props.condActions == 'ItemActions') {
                ItemActions.itemCreate(
                    this.state.title,
                    ListStore.getCurrentListID()
                );
            }

        }
        this.onReset();
    },

    render: function() {
        let formClass = 'add-item__form';
        if (this.state.isEditing) {
            formClass += ' add-item__form--editing';
        }

        return (
            <div className="add-item">
                <form className={formClass} onSubmit={this.onSubmit} >
                    <label
                        className="add-item__label"
                        htmlFor="list-item-add-input"
                        onClick={this.onReset}
                    >
                        <svg className="icon add-item__icon"><use href="./svg/svg-defs.svg#icon-add"></use></svg>
                    </label>
                    <input
                        id="list-item-add-input"
                        className="add-item__input"
                        type="text"
                        value={this.state.title}
                        placeholder={this.state.addText}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onInputBlur}
                    />
                    <input
                        className="input--hidden"
                        type="submit"
                    />
                </form>
            </div>
        );
    }
});

export default AddItem;
