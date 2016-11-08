// Libraries
import React from 'react';

// Actions
import * as ItemActions from '../actions/ItemActions';

const ItemSettings = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            taxed: this.props.itemProps.tax.active,
            taxRate: this.props.itemProps.tax.singleTaxRate,
            unitPriceActive: this.props.itemProps.unitPricing.active,
            unitPrice: this.props.itemProps.unitPricing.price,
            unitQuantity: this.props.itemProps.unitPricing.quantity,
        };
    },

    onTaxChecked: function(e) {
        const inputValue = e.target.checked;
        ItemActions.default.itemUpdateTaxed (
            this.props.itemProps.ID,
            inputValue
        );
        this.setState({
            taxed: inputValue
        });
    },

    onTaxChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            taxRate: inputValue
        });
    },

    onUnitPricingChecked: function(e) {
        const inputValue = e.target.checked;
        ItemActions.default.itemUpdateUnitPriceActive(
            this.props.itemProps.ID,
            inputValue
        );
        this.setState({
            unitPriceActive: inputValue
        });
        this.getUnitPricing();
    },

    onUnitPricingChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            unitPrice: inputValue
        });
    },

    onUnitPricingSaved: function() {
        ItemActions.default.itemUpdateUnitPrice(
            this.props.itemProps.ID,
            this.state.unitPrice
        );
        // this.setState(this.state);
        this.getUnitPricing();
    },

    onUnitQuantityChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            unitQuantity: inputValue
        });
    },

    onUnitQuantitySaved : function() {
        ItemActions.default.itemUpdateUnitQuantity(
            this.props.itemProps.ID,
            this.state.unitQuantity
        );
        // this.setState(this.state);
        this.getUnitPricing();
    },

    getTaxPricing: function() {
        var taxRate = 6.5;
        var amountTaxed = this.props.itemProps.amount;

        if (this.props.itemProps.tax.active) {
            taxRate = (taxRate / 100) + 1;
            amountTaxed *= taxRate;
            amountTaxed = (Math.round(amountTaxed * 100) / 100 ).toFixed(2);
            // Curency formatter here
            return (amountTaxed);
        }
    },

    getUnitPricing: function() {
        var calcUnitPrice = this.state.unitPrice * this.state.unitQuantity;

        if (!this.props.itemProps.unitPricing.active
            || this.state.unitPrice == 0
            || this.state.unitQuantity == 0) {
            return;
        }

        calcUnitPrice = (Math.round(calcUnitPrice * 100) / 100 ).toFixed(2);
        // Curency formatter here
        ItemActions.default.itemUpdateAmount(
            this.props.itemProps.ID,
            calcUnitPrice
        );
    },

    onListItemDelete: function() {
        ItemActions.default.itemDelete(this.props.itemProps.ID);
        this.setState(this.state);
    },

    render: function() {
        var uniqueId2 = "checkbox-" + this.props.itemProps.ID + "-2";
        var uniqueId3 = "checkbox-" + this.props.itemProps.ID + "-3";
        var checkboxClass = 'item-checkbox';

        return (
            <div className="item-options">
                <form className="item-form">
                    {/* -------------------
                        Unit pricing active
                        ------------------- */}
                    <div className="input-group">
                        <input
                            id={uniqueId3}
                            type="checkbox"
                            onChange={this.onUnitPricingChecked}
                            checked={this.state.unitPriceActive}
                            value=""
                        />
                        <label className="item-checkbox-label" htmlFor={uniqueId3}><span className={checkboxClass}></span></label>
                        <p>Unit pricing</p>
                    </div>

                    {/* ----------
                        Unit price
                        ---------- */}
                    {this.state.unitPriceActive ?
                        <div className="input-group-sub">
                            <p>Price per unit</p>
                            <input
                                className="item-input-number"
                                type="text"
                                onChange={this.onUnitPricingChanged}
                                onBlur={this.onUnitPricingSaved}
                                value={this.state.unitPrice != 0 ? this.state.unitPrice : ''}
                                placeholder="0.00"
                            />

                            <br></br>

                            {/* -------------
                                Unit quantity
                                ------------- */}
                            <p>Quantity</p>
                            <input
                                className="item-input-number"
                                type="text"
                                onChange={this.onUnitQuantityChanged}
                                onBlur={this.onUnitQuantitySaved}
                                value={this.state.unitQuantity != 0 ? this.state.unitQuantity : ''}
                                placeholder="0"
                            />
                        </div>
                    : null}

                    <div className="input-group">
                        {/* ---
                            Tax
                            --- */}
                        <input
                            id={uniqueId2}
                            type="checkbox"
                            onChange={this.onTaxChecked}
                            checked={this.state.taxed}
                            value=""
                        />
                        <label className="item-checkbox-label" htmlFor={uniqueId2}><span className={checkboxClass}></span></label>
                        <p>This item is taxed</p>
                    </div>

                    {/* --------
                        Tax rate
                        -------- */}
                    {this.state.taxed ?
                        <div className="input-group-sub">
                            <p>Price after tax:</p>
                            <input
                                className="item-input-number"
                                type="text"
                                value={this.getTaxPricing() != 0 ? this.getTaxPricing() : ''}
                                placeholder="0"
                                disabled="true"
                            />
                        </div>
                    : null}

                    <div className="item-delete">
                        <span
                            className="item-delete-button"
                            onClick={this.onListItemDelete}
                        >
                            Delete
                        </span>
                    </div>
                </form>
            </div>
        );
    }

});

export default ItemSettings;
