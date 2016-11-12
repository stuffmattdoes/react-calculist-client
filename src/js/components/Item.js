// Libraries
import React from 'react';
// var currencyFormatter = require('currency-formatter');

// Actions
import * as ItemActions from '../actions/ItemActions';

// Components
import ItemSettings from './ItemSettings';

const ListItem = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            amount: this.props.itemProps.amount,
            checked: this.props.itemProps.checked,
            expanded: false,
            isEditing: false,
            title: this.props.itemProps.title
        };
    },

    // Called when a component receives properties
    componentWillReceiveProps: function() {
        if (this.props.itemProps.amount != this.state.amount) {
            this.setState({
                amount: this.props.itemProps.amount
            });
        }
    },

    onAmountChanged: function(e) {
        const inputValue = e.target.value;

        // Currency formatter here
        this.setState({
            amount: inputValue
        });
    },

    onAmountSave: function(e) {
        const inputValue = e.target.value;

        ItemActions.default.itemUpdateAmount(
            this.props.itemProps.ID,
            this.state.amount
        );
        this.setState({
            amount: inputValue,
            isEditing: false
        });
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;

        ItemActions.default.itemUpdateChecked(
            this.props.itemProps.ID,
            inputValue
        );
        this.setState({
            checked: inputValue
        });
    },

    onItemSubmit: function(e) {
        e.preventDefault();
        // console.log(e);
    },

    onOptionsExpand: function() {
        this.state.expanded = !this.state.expanded;
        this.setState(this.state);
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;

        this.setState({
            title: inputValue
        });
    },

    onInputClick: function(e) {
        this.setState({
            isEditing: true
        });
    },

    onTitleSave: function(e) {
        const inputValue = e.target.value;

        if (inputValue.trim() != "") {
            ItemActions.default.itemUpdateTitle(
                this.props.itemProps.id,
                this.state.title
            );
        }
        this.setState({
            title: inputValue,
            isEditing: false
        });
    },

    render: function() {
        var uniqueID = "checkbox-" + this.props.itemProps.ID;
        var listItemClass = 'list-item';
        var checkboxClass = 'list-item-checkbox';
        var itemPrice = 0;

        // List item state
        if (this.state.checked) {
            listItemClass += ' list-item-checked';
            checkboxClass += ' list-item-checkbox-checked';
        } else {
            listItemClass += ' list-item-unchecked';
        }

        if (this.state.expanded) {
            listItemClass += ' list-item-expanded';
        }

        if (this.state.isEditing) {
            listItemClass += ' list-item-editing';
        }

        return (
            <div className={listItemClass} >
                <form className="list-item-container" onSubmit={this.onItemSubmit}>
                    {/* -----
                        Title
                        ----- */}
                    <input
                        id={uniqueID}
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <label
                        className="list-item-checkbox-label"
                        htmlFor={uniqueID}
                    >
                        <span className={checkboxClass}></span>
                    </label>

                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        onClick={this.onInputClick}
                        onBlur={this.onTitleSave}
                    />

                    {/* ------
                        Amount
                        ------ */}
                    {this.props.itemProps.tax.active ?
                        <span>*</span>
                    : null}
                    <input
                        className="list-item-input-number list-item-amount"
                        type="text"
                        onChange={this.onAmountChanged}
                        onClick={this.onInputClick}
                        onBlur={this.onAmountSave}
                        value={this.state.amount != 0 ? this.state.amount : ''}
                        disabled={this.props.itemProps.unitPricing.active}
                    />
                    <div
                        className="list-item-options-button"
                        onClick={this.onOptionsExpand}
                    >
                        <div className="icon-dots-vertical"></div>
                    </div>
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                </form>
                {this.state.expanded ?
                    <ItemSettings
                        itemProps={this.props.itemProps}
                    />
                : null}
            </div>
        );
    }

});

export default ListItem;