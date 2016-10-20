import React from 'react';

const Header = React.createClass({

    PropTypes: {
        items: React.PropTypes.array.isRequired
    },

    getTotalItems: function() {
        var totalItems = 0;
        this.props.items.forEach(function(value, index) {
            if (value.checked == false) {
                totalItems ++;
            }
        });
        return totalItems;
    },

    render: function() {
        var totalItems = this.getTotalItems();

        return (
            <div className="header">
                <h1>Groceries<span className="items-count">{totalItems}</span></h1>
                <div className="header-options"><span className="icon-dots-vertical"></span></div>
            </div>
        );
    }
})

export default Header;
