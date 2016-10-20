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
            title: ""
        });
        console.log("List item added!");
    },

    render: function() {
        return (
            <div className="list-item-add">
                <form className="list-item-add-form" onSubmit={this.onSubmit} >
                    <div className="input-group-buttons">
                        <button
                            onClick={this.onReset}
                            className="list-item-reset-button"
                            type="reset"
                        >x</button>
                    <span
                            onClick={this.onReset}
                            className="list-item-add-button"
                        >+</span>
                    </div>
                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        placeholder="Add List Item"
                        onChange={this.onInputChange}
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

export default AddListItem;
