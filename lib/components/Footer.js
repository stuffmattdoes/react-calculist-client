import React from 'react';

const Footer = React.createClass({

    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    getTotalCost: function() {
        var totalCost = this.props.items.reduce(function(total, item) {
            var addAmount = 0;

            if (item.checked) {
                addAmount = item.amount
            }

            return total + addAmount;
        }, 0);

        // totalCost = Number(Math.round(totalCost * 'e2') / 'e-2');
        totalCost = (Math.round(totalCost * 100) / 100 ).toFixed(2);
        return totalCost;
    },

    render: function() {
        var totalCost = this.getTotalCost();

        return (
            <div className="footer">
                <p className="items-total">Total: <strong>${totalCost}</strong></p>
            </div>
        );
    }
});

export default Footer;
