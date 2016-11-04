// Libraries
import React from 'react';

// Actions
import * as ListActions from '../actions/ListActions';

const ListItemSettings = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            taxed: this.props.listProps.tax.active,
            taxRate: this.props.listProps.tax.singleTaxRate,
            unitPriceActive: this.props.listProps.unitPricing.active,
            unitPrice: this.props.listProps.unitPricing.price,
            unitQuantity: this.props.listProps.unitPricing.quantity,
        };
    },

    onTaxChecked: function(e) {
        const inputValue = e.target.checked;
        ListActions.default.updateListItemTaxed (
            this.props.listProps.id,
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
        // console.log("onUnitPricingChecked");
        const inputValue = e.target.checked;
        this.getUnitPricing();
        ListActions.default.updateListItemUnitPriceActive(
            this.props.listProps.id,
            inputValue
        );
        this.setState({
            unitPriceActive: inputValue
        });
    },

    onUnitPricingChanged: function(e) {
        const inputValue = e.target.value;
        // this.getUnitPricing();
        this.setState({
            unitPrice: inputValue
        });
    },

    onUnitPricingSaved: function() {

        ListActions.default.updateListItemUnitPrice(
            this.props.listProps.id,
            this.state.unitPrice
        );
        this.setState(this.state);
        this.getUnitPricing();
    },

    onUnitQuantityChanged: function(e) {
        const inputValue = e.target.value;
        // this.getUnitPricing();
        this.setState({
            unitQuantity: inputValue
        });
    },

    onUnitQuantitySaved : function() {
        ListActions.default.updateListItemUnitQuantity(
            this.props.listProps.id,
            this.state.unitQuantity
        );
        this.setState(this.state);
        this.getUnitPricing();
    },

    getTaxPricing: function() {
        var taxRate = this.props.listData.taxRate;
        var amountTaxed = this.props.listProps.amount;

        if (this.state.taxed) {
            taxRate = (taxRate / 100) + 1;
            amountTaxed *= taxRate;
            amountTaxed = (Math.round(amountTaxed * 100) / 100 ).toFixed(2);
            // Curency formatter here
            return (amountTaxed);
        }

    },

    getUnitPricing: function() {
        var calcUnitPrice = this.state.unitPrice * this.state.unitQuantity;

        if (!this.state.unitPriceActive) {
            return;
        }

        calcUnitPrice = (Math.round(calcUnitPrice * 100) / 100 ).toFixed(2);
        // Curency formatter here
        // console.log(calcUnitPrice);

        ListActions.default.updateListItemAmount(
            this.props.listProps.id,
            {
                amount: calcUnitPrice
            }
        );
        // return calcUnitPrice;
    },

    onListItemDelete: function() {
        ListActions.default.deleteListItem(this.props.listProps.id);
        this.setState(this.state);
    },

    render: function() {
        var uniqueId2 = "checkbox-" + this.props.listProps.id + "-2";
        var uniqueId3 = "checkbox-" + this.props.listProps.id + "-3";
        var checkboxClass = 'list-item-checkbox';

        return (
            <div className="list-item-options">
                <div className="list-form">
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
                        <label className="list-item-checkbox-label" htmlFor={uniqueId3}><span className={checkboxClass}></span></label>
                        <p>Unit pricing</p>
                    </div>

                    {/* ----------
                        Unit price
                        ---------- */}
                    {this.state.unitPriceActive ?
                        <div className="input-group-sub">
                            <p>Price per unit</p>
                            <input
                                className="list-item-input-number"
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
                                className="list-item-input-number"
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
                        <label className="list-item-checkbox-label" htmlFor={uniqueId2}><span className={checkboxClass}></span></label>
                        <p>This item is taxed</p>
                    </div>

                    {/* --------
                        Tax rate
                        -------- */}
                    {this.state.taxed ?
                        <div className="input-group-sub">
                            <p>Price after tax:</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                value={this.getTaxPricing() != 0 ? this.getTaxPricing() : ''}
                                placeholder="0"
                                disabled="true"
                            />
                        </div>
                    : null}

                    <div className="list-delete">
                        <span
                            className="list-delete-button"
                            onClick={this.onListItemDelete}
                        >
                            Delete
                        </span>
                    </div>
                </div>
            </div>
        );
    }

});

export default ListItemSettings;
