import React from 'react';

const ListItemSettings = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {

        return {
            tax: this.props.listProps.tax.active,
            taxRate: this.props.listData.taxRate,
            unitPricing: this.props.listProps.unitPricing.active,
            unitPrice: this.props.listProps.unitPricing.price,
            unitQuantity: this.props.listProps.unitPricing.quantity
        };
    },

    onTaxChecked: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            tax: inputValue
        });
        this.props.onTaxChecked(inputValue);
    },

    onTaxChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            taxRate: inputValue
        });
        this.props.onTaxChanged(inputValue);
    },

    onUnitPricingChecked: function(e) {
        const inputValue = e.target.checked;
        this.state.unitPricing = inputValue;
        this.getUnitPricing();
        this.props.onUnitPricingChecked(inputValue);
    },

    onUnitPricingChanged: function(e) {
        const inputValue = e.target.value;
        this.state.unitPrice = inputValue;
        this.getUnitPricing();
        this.props.onUnitPricingChanged(inputValue);
    },

    onUnitQuantityChanged: function(e) {
        const inputValue = e.target.value;
        this.state.unitQuantity = inputValue;
        this.getUnitPricing();
        this.props.onUnitQuantityChanged(inputValue);
    },

    // This function seems to lag behind the actual unit price input updates...why?!
    getUnitPricing: function() {
        // console.log(this.props.listProps.unitPricing.active);
        console.log(this.state.unitPricing);
        const unitPricing = this.state.unitPrice * this.state.unitQuantity;

        if (!this.state.unitPricing) {
            return;
        }
        // console.log(unitPricing);
        this.props.onAmountChanged(unitPricing);
        this.setState(this.state);
    },

    render: function() {
        var uniqueId2 = "checkbox-" + this.props.listProps.id + "-2";
        var uniqueId3 = "checkbox-" + this.props.listProps.id + "-3";
        var checkboxClass = 'list-item-checkbox';

        return (
            <div className="list-item-options">
                <div className="list-form">
                    <div className="input-group">
                        {/* -----
                            Taxed
                            ----- */}
                        <input
                            id={uniqueId2}
                            type="checkbox"
                            onChange={this.onTaxChecked}
                            checked={this.state.tax.active}
                            value=""
                        />
                        <label className="list-item-checkbox-label" htmlFor={uniqueId2}><span className={checkboxClass}></span></label>
                        <p>This item is taxed</p>
                    </div>

                    {/* --------
                        Tax rate
                        -------- */}
                    {this.state.tax ?
                        <div className="input-group-sub">
                            <p>Tax rate</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                value={this.state.taxRate != 0 ? this.state.taxRate : ''}
                                onChange={this.onTaxChanged}
                                placeholder="0.0"
                            />
                        </div>
                    : null}

                    {/* -------------------
                        Unit pricing active
                        ------------------- */}
                    <div className="input-group">
                        <input
                            id={uniqueId3}
                            type="checkbox"
                            onChange={this.onUnitPricingChecked}
                            checked={this.props.unitPricing}
                            value=""
                        />
                        <label className="list-item-checkbox-label" htmlFor={uniqueId3}><span className={checkboxClass}></span></label>
                        <p>Unit pricing</p>
                    </div>

                    {/* ----------
                        Unit price
                        ---------- */}
                    {this.state.unitPricing ?
                        <div className="input-group-sub">
                            <p>Price per unit</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                onChange={this.onUnitPricingChanged}
                                value={this.props.unitPrice != 0 ? this.props.unitPrice : ''}
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
                                value={this.props.unitQuantity != 0 ? this.props.unitQuantity : ''}
                                placeholder="0"
                            />
                        </div>
                    : null}
                    <div className="list-delete">
                        <span
                            className="list-delete-button"
                            onClick={this.props.onListItemDelete}
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
