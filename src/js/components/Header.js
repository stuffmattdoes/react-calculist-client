import React from 'react';

// Stores
import ListStore from '../stores/ListStore';

const Header = React.createClass({

    PropTypes: {
        items: React.PropTypes.array.isRequired
    },

    backNav: function() {
        ListStore.resetListView();
    },

    render: function() {
        return (
            <div className="header">
                <div
                    className="header-back"
                    onClick={this.backNav}
                >
                    Back
                </div>
                <h1>Groceries</h1>
                <div className="header-options"><span className="icon-dots-vertical"></span></div>
            </div>
        );
    }
})

export default Header;
