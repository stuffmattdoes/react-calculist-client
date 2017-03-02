import React from 'react';
import { hashHistory } from 'react-router';

// Stores
import ListActions from '../actions/ListActions';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        location: React.PropTypes.object.isRequired,

        // Passing up
        toggleSettings: React.PropTypes.func.isRequired
    },

    backNav: function() {
        hashHistory.push('/lists/');
        ListActions.resetListView();
    },

    toggleSettings: function() {
        hashHistory.push(this.props.location.pathname + 'settings/');
        this.props.toggleSettings();
    },

    render: function() {
        return (
            <div className="header">
                {this.props.params.listID ?
                    <a
                        href="/settings"
                        className="header-left-button"
                        onClick={this.backNav}
                    >
                        Back
                    </a>
                :
                    <a
                        className="header-left-button"
                    >
                        <span className="icon-bars"></span>
                    </a>
                }
                <h1 className="header-title">{this.props.title}</h1>
                {this.props.params.listID ?
                    <a
                        className="header-options"
                        onClick={this.toggleSettings}
                    >
                        <span className="icon-dots-vertical">&nbsp;</span>
                    </a>
                : null}
            </div>
        );
    }
})

export default Header;
