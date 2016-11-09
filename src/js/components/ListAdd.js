import React from 'react';

// Actions
import * as ListActions from '../actions/ListActions';

const ListAdd = React.createClass({

    getInitialState: function() {
        return {
            title: "",
            focus: false,
            isEditing: false
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

        ListActions.default.listCreate(this.state.title);

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
                            className="button-outline button-cancel"
                        ><span>+</span></div>
                        <label
                            className="button-main button-add"
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
                        onBlur={this.onInputFocus}
                    />
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                    <div className="button-main button-confirm">
                        <span>&#10004;</span>
                    </div>
                </form>
            </div>
        );
    }
});

export default ListAdd;
