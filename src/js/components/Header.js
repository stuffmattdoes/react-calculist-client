import React from 'react';
import { browserHistory } from 'react-router';

// Stores
import * as ListActions from '../actions/ListActions';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        location: React.PropTypes.object.isRequired,

        // Passing up
        toggleSettings: React.PropTypes.func.isRequired
    },

    backNav: function() {
        browserHistory.push('/lists');
        ListActions.default.resetListView();
    },

    toggleSettings: function() {
        browserHistory.push(this.props.location.pathname + '/settings');
        this.props.toggleSettings();
    },

    render: function() {
        var thisLocation = this.props.location.pathname;

        return (
            <div className="header">
                {this.props.params.listID ?
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
                {this.props.params.listID ?
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
