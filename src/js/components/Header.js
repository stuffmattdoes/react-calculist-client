// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        buttonBack: React.PropTypes.bool,
        buttonOptions: React.PropTypes.bool,

        // Passing up
        buttonLeft: React.PropTypes.func,
        buttonRight: React.PropTypes.func
    },

    buttonRight: function(e) {
        e.preventDefault();
        this.props.buttonRight(e);
    },

    buttonLeft: function(e) {
        e.preventDefault();
        this.props.buttonLeft(e);
    },

    render: function() {
        let buttonBack = this.props.buttonBack;
        let buttonOptions = this.props.buttonOptions;

        return (
            <div className="header">
                <a
                    href="#"
                    className="header__left-button"
                    onClick={this.buttonLeft}
                >
                    {buttonBack ?
                        <svg className="icon icon__arrow-back"><use href="./svg/svg-defs.svg#icon-arrow_back"></use></svg>
                        :
                        <svg className="icon icon__arrow-back"><use href="./svg/svg-defs.svg#icon-menu"></use></svg>
                    }
                </a>

                <h1 className="header__title">{this.props.title}</h1>
                <a
                    href="#"
                    className="header__right-button"
                    onClick={this.buttonRight}
                >
                    {buttonOptions ?
                    <svg className="icon icon__more-vert"><use href="./svg/svg-defs.svg#icon-more_vert"></use></svg>
                        : null}
                </a>
            </div>
        );
    }
})

export default Header;
