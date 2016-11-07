import React from 'react';

// Stores
// import ListStore from '../stores/ListStore';

// Actions
import * as ListActions from '../actions/ListActions';

const AddListItem = React.createClass({

    getInitialState: function() {
        return {
            title: "",
            focus: false
        }
    },

    onInputChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onInputFocus: function(value) {
        this.setState({
            focus: !this.state.focus
        });
    },

    onReset: function(e) {
        e.preventDefault();
        this.setState({
            title: ""
        });
    },

    onSubmit: function(e) {
        e.preventDefault();

        ListActions.default.createListItem(this.state.title);

        // Reset the input to blank
        this.setState({
            title: ""
        });
    },

    render: function() {
        var formClass = "list-item-add-form";
        if (this.state.focus) {
            formClass += ' list-item-add-form-active';
        }

        return (
            <div className="list-item-add">
                <form className={formClass} onSubmit={this.onSubmit} >
                    <div className="input-group-buttons">
                        <div
                            onClick={this.onReset}
                            className="list-item-reset-button"
                        ><span>+</span></div>
                        <label
                            className="list-item-add-button"
                            htmlFor="list-item-add-input"
                        ><span>+</span></label>
                    </div>
                    <input
                        id="list-item-add-input"
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        placeholder="Add List Item"
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputFocus}
                    />
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                </form>
            </div>
        );
    }
});

export default AddListItem;