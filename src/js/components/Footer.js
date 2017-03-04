import React from 'react';

const Footer = React.createClass({

    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    getTotalCost: function() {
        var items = this.props.item;
        var taxRate = 6.5;
        var totalCost = this.props.items.reduce(function(total, item) {
            var addAmount = 0;

            if (item.checked) {
                addAmount = parseFloat(item.amount);

                if (item.tax.active) {
                    taxRate = (taxRate / 100) + 1;
                    addAmount *= taxRate;
                }
            }

            return total + addAmount;
        }, 0);

        // console.log("Before rounding: ", totalCost);
        totalCost = (Math.round(totalCost * 100) / 100 ).toFixed(2);
        // console.log("After rounding: ", totalCost);
        return totalCost;
    },

    render: function() {
        var totalCost = this.getTotalCost();

        return (
            <div className="footer">
                <p className="footer__total">Total: <strong>${totalCost}</strong></p>
            </div>
        );
    }
});

export default Footer;
