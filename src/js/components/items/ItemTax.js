// Libraries
import React from 'react';

// Actions
import ItemActions from '../../actions/ItemActions';

const ENTER_KEY_CODE = 13;

const ItemTax = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            taxed: this.props.itemProps.tax.active,
            taxRate: this.props.itemProps.tax.singleTaxRate,
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

    render: function() {
        let uniqueId2 = 'checkbox-' + this.props.itemProps.itemID + '-2';
        let taxToggleClass = 'toggle';
        this.state.taxed ? taxToggleClass+= ' active' : '';

        return (
            <div className="list-item-tax">
                <div className="flex-group">
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
                    <p>Tax</p>
                </div>

                {this.state.taxed ?
                    <div className="flex-group">
                        <p className="list-item__title">Price after tax:</p>
                        <input
                            className="list-item__input list-item__input--price"
                            type="text"
                            value={this.getTaxPricing() != 0 ? this.getTaxPricing() : ''}
                            placeholder="0"
                            disabled="true"
                        />
                    </div>
                    : null}
            </div>

        );
    }

});

export default ItemTax;
