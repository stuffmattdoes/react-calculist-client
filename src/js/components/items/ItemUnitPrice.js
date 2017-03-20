// Libraries
import React from 'react';

// Actions
import ItemActions from '../../actions/ItemActions';

const ENTER_KEY_CODE = 13;

const ItemSettings = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
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

    render: function() {
        let uniqueId3 = 'checkbox-' + this.props.itemProps.itemID + '-';
        let unitPricingToggleClass = 'toggle';
        this.state.unitPriceActive ? unitPricingToggleClass += ' active' : '';

        return (
            <div className="list-item-unit-price">
                <div className="flex-group">
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

                {this.state.unitPriceActive ?
                    <div>
                        <div className="flex-group">
                            <p className="list-item__title">Price per unit</p>
                            <input
                                className="list-item__input list-item__input--price"
                                type="number"
                                onBlur={this.onUnitPricingSaved}
                                onChange={this.onUnitPricingChanged}
                                onKeyDown={this.onInputKeyDown}
                                value={this.state.unitPrice != 0 ? this.state.unitPrice : ''}
                                placeholder="0.00"
                            />

                        </div>
                        <div className="flex-group">
                            {/* -------------
                             Unit quantity
                             ------------- */}
                            <p className="list-item__title">Quantity</p>
                            <input
                                className="list-item__input list-item__input--price"
                                type="number"
                                onBlur={this.onUnitQuantitySaved}
                                onChange={this.onUnitQuantityChanged}
                                onKeyDown={this.onInputKeyDown}
                                value={this.state.unitQuantity != 0 ? this.state.unitQuantity : ''}
                                placeholder="0"
                            />
                        </div>
                        <hr />
                    </div>
                    : null}
            </div>
        );
    }

});

export default ItemSettings;
