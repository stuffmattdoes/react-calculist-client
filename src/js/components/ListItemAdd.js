import React from 'react';

// Actions
import * as ListActions from '../actions/ListActions';
import * as ItemActions from '../actions/ItemActions';

const ListAdd = React.createClass({

    propTypes: {
        condActions: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            title: "",
            isEditing: false
        }
    },

    onInputChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue,
            isEditing: true
        });
    },

    onInputFocus: function(value) {
        this.setState({
            isEditing: true
        });
    },

    onInputBlur: function() {
        if (this.state.title.trim() == "") {
            this.onReset();
        }
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
            if (this.props.condActions == "ListActions") {
                ListActions.default.listCreate(this.state.title);
            } else if (this.props.condActions == "ItemActions") {
                ItemActions.default.itemCreate(this.state.title);
            }
        }
        this.onReset(e);
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
                        onBlur={this.onInputBlur}
                    />
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                    {this.state.isEditing
                    && this.state.title.trim() != "" ?
                    <div
                        className="button-main button-confirm"
                        onClick={this.onSubmit}
                    >
                        <span>&#10004;</span>
                    </div>
                    : null}
                </form>
            </div>
        );
    }
});

export default ListAdd;
