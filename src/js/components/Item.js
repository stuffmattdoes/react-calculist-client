// Libraries
import React from 'react';

// Actions
import ItemActions from '../actions/ItemActions';

// Components
import ItemSettings from './ItemSettings';

const ENTER_KEY_CODE = 13;

const ListItem = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            amount: this.props.itemProps.amount,
            checked: this.props.itemProps.checked,
            settingsOpen: false,
            isEditing: false,
            title: this.props.itemProps.title
        };
    },

    // Called when a component receives properties
    componentWillReceiveProps: function() {
        if (this.props.itemProps.amount != this.state.amount) {
            this.setState({
                amount: this.props.itemProps.amount
            });
        }
    },

    onAmountChanged: function(e) {
        var inputValue = e.target.value;

        // Currency formatter here
        this.setState({
            amount: inputValue
        });
    },

    onAmountSave: function() {
        var amount = this.amountFormat(this.state.amount);
        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                amount: amount
            }
        );

        this.setState({
            isEditing: false
        });
    },

    amountFormat: function(num) {
        if (num === '') {
            return 0;
        }
        return num;
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;

        ItemActions.itemUpdate(
            this.props.itemProps.itemID,
            {
                checked: inputValue
            }
        );

        this.setState({
            checked: inputValue
        });
    },

    onInputClick: function(e) {
        this.setState({
            isEditing: true
        });
    },

    onInputKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            console.log(document.activeElement);
            document.activeElement.blur();
        }
    },

    onItemSubmit: function(e) {
        e.preventDefault();
    },

    onOptionsExpand: function() {
        this.state.settingsOpen = !this.state.settingsOpen;
        this.setState(this.state);
    },

    onTitleChange: function(e) {
        const inputValue = e.target.value;
        this.setState({
            title: inputValue
        });
    },

    onTitleSave: function(e) {
        // console.log("onTitleSave");
        const inputValue = e.target.value;

        if (inputValue.trim() != "") {
            ItemActions.itemUpdate(
                this.props.itemProps.itemID,
                {
                    title: this.state.title
                }
            );
        }

        this.setState({
            title: inputValue,
            isEditing: false
        });
    },

    render: function() {
        var uniqueID = "checkbox-" + this.props.itemProps.itemID;
        var listItemClass = 'list-item';
        var checkboxClass = 'list-item-checkbox';

        // List item state
        if (this.state.checked) {
            listItemClass += ' list-item-checked';
            checkboxClass += ' list-item-checkbox-checked';
        } else {
            listItemClass += ' list-item-unchecked';
        }

        if (this.state.settingsOpen) {
            listItemClass += ' list-item-expanded';
        }

        if (this.state.isEditing) {
            listItemClass += ' list-item-editing';
        }

        return (
            <div className={listItemClass} >
                <form className="list-item-container" onSubmit={this.onItemSubmit} >
                    {/* -----
                        Title
                        ----- */}
                    <input
                        id={uniqueID}
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <label
                        className="list-item-checkbox-label"
                        htmlFor={uniqueID}
                    >
                        <span className={checkboxClass}>&nbsp;</span>
                    </label>

                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onBlur={this.onTitleSave}
                        onChange={this.onTitleChange}
                        onClick={this.onInputClick}
                        onKeyDown={this.onInputKeyDown}
                    />

                    {/* ------
                        Amount
                        ------ */}
                    <div className="input-group">
                        {this.props.itemProps.tax.active ?
                            <span>*</span>
                        : null}
                        <label className="currency-prefix">$</label>
                        <input
                            className="list-item-input-number list-item-amount"
                            type="number"
                            value={this.state.amount != 0 ? this.state.amount : ''}
                            onBlur={this.onAmountSave}
                            onChange={this.onAmountChanged}
                            onClick={this.onInputClick}
                            onKeyDown={this.onInputKeyDown}
                            disabled={this.props.itemProps.unitPricing.active}
                        />
                        <div
                            className="list-item-options-button"
                            onClick={this.onOptionsExpand}
                        >
                            <div className="icon-dots-vertical"></div>
                        </div>
                        <input
                            className="input-hidden"
                            type="submit"
                        />
                    </div>
                </form>
                {this.state.settingsOpen ?
                    <ItemSettings
                        itemProps={this.props.itemProps}
                    />
                : null}
            </div>
        );
    }

});

export default ListItem;
