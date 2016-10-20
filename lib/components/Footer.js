import React from 'react';

const Footer = React.createClass({

    PropTypes: {
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
