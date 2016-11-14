import React from 'react';

// Stores
import * as ListActions from '../actions/ListActions';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        navBack: React.PropTypes.bool,
        options: React.PropTypes.bool,

        // Passing up
        toggleSettings: React.PropTypes.func.isRequired
    },

    backNav: function() {
        ListActions.default.resetListView();
    },

    toggleSettings: function() {
        this.props.toggleSettings();
    },

    render: function() {
        return (
            <div className="header">
                {this.props.navBack ?
                    <div
                        className="header-left-button"
                        onClick={this.backNav}
                    >
                        Back
                    </div>
                :
                    <div
                        className="header-left-button"
                    >
                        Menu
                    </div>
                }
                <h1 className="header-title">{this.props.title}</h1>
                {this.props.options ?
                    <div
                        className="header-options"
                        onClick={this.toggleSettings}
                    >
                        <span className="icon-dots-vertical"></span>
                    </div>
                : null}
            </div>
        );
    }
})

export default Header;
