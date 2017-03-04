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

    optionsToggle: function() {
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
        var checkboxClass = 'list-item__checkmark';

        // List item state
        if (this.state.checked) {
            listItemClass += ' list-item--checked';
            checkboxClass += ' list-item__checkmark--checked';
        } else {
            listItemClass += ' list-item--unchecked';
        }

        if (this.state.settingsOpen) {
            listItemClass += ' list-item--expanded';
        }

        if (this.state.isEditing) {
            listItemClass += ' list-item--editing';
        }

        return (
            <div className={listItemClass} >
                <form className="list-item__container" onSubmit={this.onItemSubmit} >
                    {/* -----
                        Title
                        ----- */}
                    <input
                        id={uniqueID}
                        className="list-item__input--checkbox"
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <label
                        className="list-item__label--checkmark"
                        htmlFor={uniqueID}
                    >
                        {this.state.checked ?
                            <svg className="icon icon__done"><use href="./svg/svg-defs.svg#icon-done"></use></svg>
                            :
                            <span className={checkboxClass}>&nbsp;</span>
                        }
                    </label>

                    <input
                        className="list-item__input list-item__input--title"
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
                    <div className="list-item__group">
                        {this.props.itemProps.unitPricing.active ?
                            <svg className="icon icon__functions"><use href="./svg/svg-defs.svg#icon-functions"></use></svg>
                            : null}
                        {this.props.itemProps.tax.active ?
                            <svg className="icon icon__tag"><use href="./svg/svg-defs.svg#icon-tag"></use></svg>
                            : null}
                        <input
                            className="list-item__input list-item__input--price"
                            type="number"
                            value={this.state.amount != 0 ? this.state.amount : ''}
                            onBlur={this.onAmountSave}
                            onChange={this.onAmountChanged}
                            onClick={this.onInputClick}
                            onKeyDown={this.onInputKeyDown}
                            disabled={this.props.itemProps.unitPricing.active}
                        />
                        <div
                            className="list-item__option-button"
                            onClick={this.optionsToggle}
                        >
                            {this.state.settingsOpen ?
                                <svg className="icon icon__keyboard-arrow-up"><use href="./svg/svg-defs.svg#icon-keyboard_arrow_up"></use></svg>
                                :
                                <svg className="icon icon__keyboard-arrow-down"><use href="./svg/svg-defs.svg#icon-keyboard_arrow_down"></use></svg>
                            }
                        </div>
                        <input
                            className="list-item__submit"
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
