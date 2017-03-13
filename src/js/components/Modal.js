// Libraries
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Modal = React.createClass({

    propTypes: {
        headlineText: React.PropTypes.string,
        bodyText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        showModal: React.PropTypes.bool,

        // Passing up
        cancelClick: React.PropTypes.func,
        confirmClick: React.PropTypes.func
    },

    render: function() {

        return (
            <ReactCSSTransitionGroup
                transitionName='modal-transition'
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
                >
                {this.props.showModal ?
                    <div className="modal modal-transition" key={1} >
                        <div className="modal__overlay" onClick={this.props.cancelClick}></div>
                        <div className="modal__box">
                            <h2>{this.props.headlineText}</h2>
                            <p>{this.props.bodyText}</p>
                            <div className="align--right">
                                {this.props.cancelText ?
                                    <div className="button button--text button--text-success" onClick={this.props.cancelClick}>{this.props.cancelText}</div>
                                    : null}
                                <div className="button button--text button--text-success" onClick={this.props.confirmClick}>{this.props.confirmText}</div>
                            </div>
                        </div>
                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        );

    }
});

export default Modal;