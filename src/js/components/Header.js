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

    backNav: function(e) {
        e.preventDefault();
        hashHistory.push('/lists/');
    },

    toggleSettings: function(e) {
        e.preventDefault();
        hashHistory.push(this.props.location.pathname + 'settings/');
        this.props.toggleSettings();
    },

    toggleAccount: function(e) {
        e.preventDefault();
        hashHistory.push(this.props.location.pathname + 'account/');
        this.props.toggleAccount();
    },

    render: function() {
        return (
            <div className="header">
                {this.props.params.listID ?
                    <a
                        href="#"
                        className="header__left-button"
                        onClick={this.backNav}
                    >
                        <svg className="icon icon__arrow-back"><use href="./svg/svg-defs.svg#icon-arrow_back"></use></svg>
                    </a>
                :
                    <a
                        className="header__left-button"
                    >
                        <svg className="icon icon__menu"><use href="./svg/svg-defs.svg#icon-menu"></use></svg>
                    </a>
                }
                <h1 className="header__title">{this.props.title}</h1>
                {this.props.params.listID ?
                    <a
                        href="#"
                        className="header__right-button"
                        onClick={this.toggleSettings}
                    >
                        <svg className="icon icon__more-vert"><use href="./svg/svg-defs.svg#icon-more_vert"></use></svg>
                    </a>
                : null}
            </div>
        );
    }
})

export default Header;
