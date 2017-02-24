import React from 'react';

// Actions
import ListActions from '../actions/ListActions';
import ItemActions from '../actions/ItemActions';

// Stores
import AuthStore from '../stores/AuthStore';
import ListStore from '../stores/ListStore';

var ENTER_KEY_CODE = 13;

const ListAdd = React.createClass({

    propTypes: {
        condActions: React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        // console.log(this.props.condActions);
        return {
            title: "",
            isEditing: false
        }
    },

    onInputBlur: function() {
        if (this.state.title.trim() == "") {
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
        this.setState({
            title: "",
            isEditing: false
        });
    },

    onSubmit: function(e) {
        e.preventDefault();
        if (this.state.title.trim() != "") {

            // Create a new list
            if (this.props.condActions == "ListActions") {
                ListActions.listCreate(
                    this.state.title,
                    AuthStore.getUser()._id
                );

            // Create a new item
            } else if (this.props.condActions == "ItemActions") {
                ItemActions.itemCreate(
                    this.state.title,
                    ListStore.getCurrentListID()
                );
            }

        }
        this.onReset();
    },

    render: function() {
        var formClass = "list-item-add-form";
        if (this.state.isEditing) {
            formClass += ' list-item-add-form-active';
        }

        return (
            <div className="list-item-add">
                <form className={formClass} onSubmit={this.onSubmit} >
                    <div className="input-group-buttons">
                        <div
                            onClick={this.onReset}
                            className="button-circle button-cancel"
                        ><span>+</span></div>
                        <label
                            className="button-circle button-add"
                            htmlFor="list-item-add-input"
                        ><span>+</span></label>
                    </div>
                    <input
                        id="list-item-add-input"
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        placeholder="Add Item"
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onInputBlur}
                    />
                    {this.state.isEditing
                    && this.state.title.trim() != "" ?
                    <div
                        className="button-circle button-confirm"
                        onClick={this.onSubmit}
                    >
                        <span>&#10004;</span>
                    </div>
                    : null}
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                </form>
            </div>
        );
    }
});

export default ListAdd;
