import React from 'react';

const Header = React.createClass({

    PropTypes: {
        items: React.PropTypes.array.isRequired
    },

    render: function() {
        var totalCost = this.props.items.reduce(function(total, item) {
            var addAmount = 0;

            if (item.checked) {
                addAmount = item.amount
            }

            return total + addAmount;
        }, 0);

        return (
            <div className="header">
                <h1>Groceries</h1>
                <p className="items-total">Total: ${totalCost}</p>
            </div>
        );
    }
})

export default Header;
