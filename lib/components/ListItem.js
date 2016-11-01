// Libraries
import React from 'react';
// var currencyFormatter = require('currency-formatter');

// Stores
// import ListStore from '../stores/ListStore';

// Actions
import * as ListActions from '../actions/ListActions';

// Components
import ListItemSettings from './ListItemSettings';

const ListItem = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired,

        // Passing up
        // onChecked: React.PropTypes.func.isRequired,
        // onAmountChanged: React.PropTypes.func.isRequired,
        onTaxChecked: React.PropTypes.func.isRequired,
        onTaxChanged: React.PropTypes.func.isRequired,
        onUnitPricingChecked: React.PropTypes.func.isRequired,
        onUnitPricingChanged: React.PropTypes.func.isRequired,
        onUnitQuantityChanged: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {

        return {
            title: this.props.listProps.title,
            amount: this.props.listProps.amount,
            checked: this.props.listProps.checked,
            taxed: this.props.listProps.tax.active,
            expanded: false
        };
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;

        this.setState({
            checked: inputValue
        });

        // console.log(inputValue);

        ListActions.updateListItem({
            id: this.props.listProps.id,
            key: "checked",
            value: inputValue
        });

        // this.props.onChecked(inputValue);
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onAmountChanged: function(e) {
        var inputValue = e.target.value;
        // var inputValue = currencyFormatter.format(e.target.value, {
        //     code: 'USD',
        //     symbol: '',
        //     decimalDigits: 1
        // });
        this.setState({
            amount: inputValue
        });

        // ListActions.updateListItem({
        //     id: this.props.listProps.id,
        //     key: "amount",
        //     value: inputValue
        // });

        this.props.onAmountChanged(inputValue);
    },

    onAmountClicked: function(e) {
        if (this.props.listProps.unitPricing.active) {
            e.target.blur();
            this.state.expanded = true;
            this.setState(this.state);
        }
    },

    onOptionsExpand: function() {
        this.state.expanded = !this.state.expanded;
        this.setState(this.state);
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
                        checked={this.props.listProps.checked}
                        value=""
                    />
                    <label className="list-item-checkbox-label" htmlFor={uniqueId}><span className={checkboxClass}></span></label>

                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
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
                        value={this.props.listProps.amount != 0 ? this.props.listProps.amount : ''}
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
                        onAmountChanged={this.props.onAmountChanged}
                        onTaxChecked={this.props.onTaxChecked}
                        onTaxChanged={this.props.onTaxChanged}
                        onUnitPricingChecked={this.props.onUnitPricingChecked}
                        onUnitPricingChanged={this.props.onUnitPricingChanged}
                        onUnitQuantityChanged={this.props.onUnitQuantityChanged}
                    />
                : null}
            </div>
        );
    }

});

export default ListItem;
