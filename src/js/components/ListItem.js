// Libraries
import React from 'react';
// var currencyFormatter = require('currency-formatter');

// Actions
import * as ListActions from '../actions/ListActions';

// Components
import ListItemSettings from './ListItemSettings';

const ListItem = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired
    },

    getInitialState: function () {

        console.log(this.props.listProps.amount);

        return {
            amount: this.props.listProps.amount,
            checked: this.props.listProps.checked,
            expanded: false,
            title: this.props.listProps.title
        };
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

        ListActions.default.updateListItemAmount(
            this.props.listProps.id,
            this.state.amount
        );
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;

        ListActions.default.updateListItemChecked(
            this.props.listProps.id,
            inputValue
        );

        this.setState({
            checked: inputValue
        });
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

    onTitleSave: function(e) {
        const inputValue = e.target.value;

        if (inputValue.trim() != "") {
            ListActions.default.updateListItemTitle(
                this.props.listProps.id,
                this.state.title
            );
        }

        this.setState({
            title: inputValue
        });
    },

    render: function() {
        var uniqueId = "checkbox-" + this.props.listProps.id;
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

        return (
            <div className={listItemClass} >
                <div className="list-form" >
                    {/* -----
                        Title
                        ----- */}
                    <input
                        id={uniqueId}
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <label
                        className="list-item-checkbox-label"
                        htmlFor={uniqueId}
                    >
                        <span className={checkboxClass}></span>
                    </label>

                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        onBlur={this.onTitleSave}
                    />

                    {/* ------
                        Amount
                        ------ */}
                    {this.props.listProps.tax.active ?
                        <span>*</span>
                    : null}
                    <input
                        className="list-item-input-number list-item-amount"
                        type="text"
                        onChange={this.onAmountChanged}
                        onBlur={this.onAmountSave}
                        value={this.state.amount != 0 ? this.state.amount : ''}
                        disabled={this.props.listProps.unitPricing.active}
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
            </div>
                {this.state.expanded ?
                    <ListItemSettings
                        listProps={this.props.listProps}
                        listData={this.props.listData}
                    />
                : null}
            </div>
        );
    }

});

export default ListItem;
