import React from 'react';

// Actions
import * as ListActions from '../actions/ListActions';

const ListAdd = React.createClass({

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

        ListActions.default.itemCreate(this.state.title);

        // Reset the input to blank
        this.setState({
            title: ""
        });
    },

    render: function() {
        var formClass = "item-add-form";
        if (this.state.focus) {
            formClass += ' item-add-form-active';
        }

        return (
            <div className="item-add">
                <form className={formClass} onSubmit={this.onSubmit} >
                    <div className="input-group-buttons">
                        <div
                            onClick={this.onReset}
                            className="item-reset-button"
                        ><span>+</span></div>
                        <label
                            className="item-add-button"
                            htmlFor="item-add-input"
                        ><span>+</span></label>
                    </div>
                    <input
                        id="item-add-input"
                        className="item-title"
                        type="text"
                        value={this.state.title}
                        placeholder="Add Item"
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

export default ListAdd;
