import React from 'react';
import { browserHistory } from 'react-router';

// Stores
import * as ListActions from '../actions/ListActions';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        route: React.PropTypes.object.isRequired,
        params: React.PropTypes.object,
        location: React.PropTypes.object.isRequired,
    },

    backNav: function() {
        browserHistory.push('/lists');
        ListActions.default.resetListView();
    },

    toggleSettings: function() {
        browserHistory.push(this.props.location.pathName + '/settings');
        this.props.toggleSettings();
    },

    render: function() {
        var thisLocation = this.props.location.pathname;
        // console.log(this.props.location, this.props.route, this.props.params);

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
