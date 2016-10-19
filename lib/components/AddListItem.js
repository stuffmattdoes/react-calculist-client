import React from 'react';

const AddListItem = React.createClass({
    propTypes: {
        onAdd: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            title: "",
        }
    },

    onInputChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onReset: function(e) {
        e.preventDefault();
        this.setState({
            title: ""
        });
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.props.onAdd(this.state.title);
        this.setState({
            title: "",
            amount: 0.00,
        });
    },

    render: function() {
        return (
            <div className="list-item-add">
                <form onSubmit={this.onSubmit} >
                    <button
                        onClick={this.onReset}
                        className="list-item-reset"
                        type="reset"
                        value="X"
                    >X</button>
                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        placeholder="+ Add List Item"
                        onChange={this.onInputChange}
                    />
                </form>
            </div>
        );
    }
});

export default AddListItem;
