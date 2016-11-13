import React from 'react';

// Stores
import ListStore from '../stores/ListStore';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        navBack: React.PropTypes.bool.isRequired
    },

    backNav: function() {
        ListStore.resetListView();
    },

    render: function() {
        return (
            <div className="header">
                {this.props.navBack ?
                    <div
                        className="header-back"
                        onClick={this.backNav}
                    >
                        Back
                    </div>
                : null}
                <h1>{this.props.title}</h1>
                <div className="header-options"><span className="icon-dots-vertical"></span></div>
            </div>
        );
    }
})

export default Header;
