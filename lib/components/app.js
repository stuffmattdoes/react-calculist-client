import React from 'react';

const Lists_Data = {
    lists: [
        {
            title: "Groceries",
            items: [
                {
                    title: "Milk",
                    status: "Open",
                    amount: 0.00,
                    taxed: false,
                    id: 0
                },
                {
                    title: "Eggs",
                    status: "Open",
                    amount: 0.00,
                    taxed: false,
                    id: 1
                },
                {
                    title: "Cat food",
                    status: "Open",
                    amount: 0.00,
                    taxed: false,
                    id: 2
                },
                {
                    title: "Vegetable oil",
                    status: "Open",
                    amount: 0.00,
                    taxed: false,
                    id: 3
                },
                {
                    title: "Butter",
                    status: "closed",
                    amount: 3.49,
                    taxed: false,
                    id: 4
                },
                {
                    title: "More cat food",
                    status: "closed",
                    amount: 12.99,
                    taxed: false,
                    id: 5
                },
            ],
            taxAmount: 6.5,
            nextId: 6
        }
    ]
}

var nextId = Lists_Data.lists[0].nextId;

function Header(props) {
    const totalCost = props.items.reduce(function(total, item) {
        return total + item.amount;
    }, 0);

    return (
        <div className="header">
            <h1>Groceries</h1>
            <p className="items-total">Total: ${totalCost}</p>
        </div>
    );
}

Header.propTypes = {
    items: React.PropTypes.array.isRequired
}

const ListItem = React.createClass({
    propTypes: {
        // title: React.PropTypes.string.isRequired,
        // amount: React.PropTypes.number.isRequired,
        // status: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            title: this.props.title,
            amount: this.props.amount,
            status: this.props.status
        };
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.value;
        // console.log(inputValue);
        this.setState({
            status: inputValue
        });
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;
        // console.log(inputValue);
        this.setState({
            title: inputValue
        });
    },

    onAmountChange: function(e) {
        const inputValue = e.target.value;
        // console.log(inputValue);
        this.setState({
            amount: inputValue
        });
    },

    onSubmit: function(e) {
        e.preventDefault();
        console.log("Submit");
    },

    render: function() {
        var isChecked;

        if (this.props.status == "Open") {
            isChecked = false;
        } else {
            isChecked = true;
        }

        return (
            <div className="list-item">
                <form onSubmit={this.onSubmit} >
                    <input
                        className="list-item-checkbox"
                        type="checkbox"
                        onChange={this.onCheckedChange}
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

// Application class
const App = React.createClass({

    getInitialState: function() {
        return Lists_Data;
    },

    onAddListItem: function(title) {
        this.state.lists[0]["items"].push({
            title: title,
            amount: 0.00,
            id: nextId
        });
        this.setState(this.state);
        nextId ++;
    },

    render: function() {

        return (
            <div className="wrapper">
                <div className="app">
                    <Header items={this.state.lists[0]["items"]} />
                    <div className="list">
                        {this.state.lists[0]["items"].map(function(listItem, index) {
                            return (
                                <ListItem
                                    title={listItem.title}
                                    amount={listItem.amount}
                                    status={listItem.status}
                                    key={listItem.id}
                                />
                            );
                        }.bind(this))}
                    </div>
                    <AddListItem onAdd={this.onAddListItem}/>
                </div>
            </div>
        );
    }
});

export default App;
