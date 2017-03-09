import React from 'react';

const Header = React.createClass({

    PropTypes: {
        title: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,

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
        let itemView = false;

        if (this.props.params.listID) {
            itemView = true;
        }

        return (
            <div className="header">
                <a
                    href="#"
                    className="header__left-button"
                    onClick={this.buttonLeft}
                >
                    {itemView ?
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
                    {itemView ?
                    <svg className="icon icon__more-vert"><use href="./svg/svg-defs.svg#icon-more_vert"></use></svg>
                        : null}
                </a>
            </div>
        );
    }
})

export default Header;
