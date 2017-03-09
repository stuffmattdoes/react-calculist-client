// Libraries
import React from 'react';

// Stores
import ItemStore from '../stores/ItemStore';

const Footer = React.createClass({

    getTotalCost: function() {
        let items = ItemStore.getAll();
        let taxRate = 6.5;
        let totalCost = items.reduce((total, item) => {
            let addAmount = 0;

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
        let totalCost = this.getTotalCost();

        return (
            <div className="footer">
                <p className="footer__total">Total: <strong>{ totalCost }</strong></p>
            </div>
        );
    }
});

export default Footer;
