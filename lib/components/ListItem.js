import React from 'react';

const ListItem = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        onChecked: React.PropTypes.func.isRequired,
        onAmountChange: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            title: this.props.listProps.title,
            amount: this.props.listProps.amount,
            checked: this.props.listProps.checked
        };
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            checked: inputValue
        });

        this.props.onChecked();
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onAmountChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            amount: inputValue
        });

        this.props.onAmountChange();
    },

    onSubmit: function(e) {
        e.preventDefault();
    },

    render: function() {
        var btnClass = 'list-item';
        if (this.state.checked) {
            btnClass += ' list-item-checked';
        }

        return (
            <div className={btnClass} >
                <form onSubmit={this.onSubmit} >
                    <input
                        className="list-item-checkbox"
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        placeholder="New List Item"
                    />
                    <input
                        className="list-item-amount"
                        type="number"
                        step="0.01"
                        min="0.00"
                        onChange={this.onAmountChange}
                        value={this.state.amount != 0 ? this.state.amount : ''}
                    />
                    <input
                        className="input-hidden"
                        type="submit"
                    />
                </form>
            </div>
        );
    }

});

export default ListItem;
