// Libraries
import React from 'react';

// Actions
import ItemActions from '../actions/ItemActions';

const ENTER_KEY_CODE = 13;

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

    onInputKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            e.target.blur();
        }
    },

    onTaxChecked: function(e) {
        const inputValue = e.target.checked;
        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                tax: {
                    active: inputValue
                }
            }
        );
        this.setState({
            taxed: inputValue
        });
    },

    onUnitPricingChecked: function(e) {
        const inputValue = e.target.checked;
        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                unitPricing: {
                    active: inputValue
                }
            }
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
        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                unitPricing: {
                    price: this.state.unitPrice
                }
            }
        );
        this.setState(this.state);
        this.getUnitPricing();
    },

    onUnitQuantityChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            unitQuantity: inputValue
        });
    },

    onUnitQuantitySaved : function() {
        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                unitPricing: {
                    quantity: this.state.unitQuantity
                }
            }
        );
        this.setState(this.state);
        this.getUnitPricing();
    },

    getTaxPricing: function() {
        let taxRate = 6.5;
        let amountTaxed = this.props.itemProps.amount;

        if (this.props.itemProps.tax.active) {
            taxRate = (taxRate / 100) + 1;
            amountTaxed *= taxRate;
            amountTaxed = (Math.round(amountTaxed * 100) / 100 ).toFixed(2);
            // Curency formatter here
            return (amountTaxed);
        }
    },

    getUnitPricing: function() {
        let calcUnitPrice = this.state.unitPrice * this.state.unitQuantity;

        if (!this.props.itemProps.unitPricing.active
            || this.state.unitPrice == 0
            || this.state.unitQuantity == 0) {
            return;
        }

        calcUnitPrice = (Math.round(calcUnitPrice * 100) / 100 ).toFixed(2);

        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                amount: calcUnitPrice
            }
        );
    },

    onListItemDelete: function() {
        let itemID = this.props.itemProps.itemID;
        ItemActions.itemDelete(itemID);
        this.setState(this.state);
    },

    render: function() {
        let uniqueId2 = 'checkbox-' + this.props.itemProps.itemID + '-2';
        let uniqueId3 = 'checkbox-' + this.props.itemProps.itemID + '-';
        let unitPricingToggleClass = 'toggle';
        let taxToggleClass = 'toggle';
        this.state.unitPriceActive ? unitPricingToggleClass += ' active' : '';
        this.state.taxed ? taxToggleClass+= ' active' : '';

        return (
            <div className="list-item-options">
                <form className="list-item-options__container">
                    {/* -------------------
                        Unit pricing active
                        ------------------- */}
                    <div className="list-item__group--flex">
                        <input
                            id={uniqueId3}
                            type="checkbox"
                            className="checkbox--hidden"
                            onChange={this.onUnitPricingChecked}
                            onKeyDown={this.onInputKeyDown}
                            checked={this.state.unitPriceActive}
                            value=""
                        />
                        <label className="label--toggle" htmlFor={uniqueId3}>
                            <div className={unitPricingToggleClass}>
                                <div className="toggle__base"></div>
                                <div className="toggle__slider"></div>
                            </div>
                        </label>
                        <p>Unit pricing</p>
                    </div>

                    {/* ----------
                        Unit price
                        ---------- */}
                    {this.state.unitPriceActive ?
                        <div className="list-item__group--right">
                            <p>Price per unit</p>
                            <input
                                className="list-item__input list-item__input--price"
                                type="text"
                                onBlur={this.onUnitPricingSaved}
                                onChange={this.onUnitPricingChanged}
                                onKeyDown={this.onInputKeyDown}
                                value={this.state.unitPrice != 0 ? this.state.unitPrice : ''}
                                placeholder="0.00"
                            />

                            <br></br>

                            {/* -------------
                                Unit quantity
                                ------------- */}
                            <p>Quantity</p>
                            <input
                                className="list-item__input list-item__input--price"
                                type="text"
                                onBlur={this.onUnitQuantitySaved}
                                onChange={this.onUnitQuantityChanged}
                                onKeyDown={this.onInputKeyDown}
                                value={this.state.unitQuantity != 0 ? this.state.unitQuantity : ''}
                                placeholder="0"
                            />
                        </div>
                    : null}

                    <div className="list-item__group--flex">
                        {/* ---
                            Tax
                            --- */}
                        <input
                            id={uniqueId2}
                            type="checkbox"
                            className="checkbox--hidden"
                            onChange={this.onTaxChecked}
                            onKeyDown={this.onInputKeyDown}
                            checked={this.state.taxed}
                            value=""
                        />
                        <label className="label--toggle" htmlFor={uniqueId2}>
                            <div className={taxToggleClass}>
                                <div className="toggle__base"></div>
                                <div className="toggle__slider"></div>
                            </div>
                        </label>
                        <p>This item is taxed</p>
                    </div>

                    {/* --------
                        Tax rate
                        -------- */}
                    {this.state.taxed ?
                        <div className="list-item__group--right">
                            <p>Price after tax:</p>
                            <input
                                className="list-item__input list-item__input--price"
                                type="text"
                                value={this.getTaxPricing() != 0 ? this.getTaxPricing() : ''}
                                placeholder="0"
                                disabled="true"
                            />
                        </div>
                    : null}

                    <div className="list-item__group--right">
                        <div
                            className="button button--text button--text-warning"
                            onClick={this.onListItemDelete}
                        >
                            Delete
                        </div>
                    </div>
                </form>
            </div>
        );
    }

});

export default ItemSettings;
