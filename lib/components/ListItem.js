import React from 'react';

// Components
import ListItemSettings from './ListItemSettings';

const ListItem = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired,
        onChecked: React.PropTypes.func.isRequired,
        onAmountChange: React.PropTypes.func.isRequired,
        onTaxChecked: React.PropTypes.func.isRequired,
        // onTaxChanged: React.PropTypes.func.isRequired,
        onUnitPricingChecked: React.PropTypes.func.isRequired,
        onListItemDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            title: this.props.listProps.title,
            amount: this.props.listProps.amount,
            checked: this.props.listProps.checked,
            tax: this.props.listProps.tax.active,
            expanded: false
        };
    },

    onCheckedChange: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            checked: inputValue
        });

        this.props.onChecked(inputValue);
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

        this.props.onAmountChange(inputValue);
    },

    onSubmit: function(e) {
        e.preventDefault();
    },

    onOptionsExpand: function() {
        this.state.expanded = !this.state.expanded;
        this.setState(this.state);
    },

    render: function() {
        var uniqueId = "checkbox-" + this.props.listProps.id;
        var listItemClass = 'list-item';
        var checkboxClass = 'list-item-checkbox';

        if (this.state.checked) {
            listItemClass += ' list-item-checked';
            checkboxClass += ' list-item-checkbox-checked';
        } else {
            listItemClass += ' list-item-unchecked';
        }

        if (this.state.expanded) {
            listItemClass += ' list-item-expanded';
        }

        console.log(this.state.tax);
        
        return (
            <div className={listItemClass} >
                <div className="list-form" >
                    <input
                        id={uniqueId}
                        type="checkbox"
                        onChange={this.onCheckedChange}
                        checked={this.state.checked}
                        value=""
                    />
                    <label className="list-item-checkbox-label" htmlFor={uniqueId}><span className={checkboxClass}></span></label>

                    <input
                        className="list-item-title"
                        type="text"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />

                    {this.state.tax ?
                        <p>*</p>
                    : null}
                    <input
                        className="list-item-input-number list-item-amount"
                        type="text"
                        onChange={this.onAmountChange}
                        value={this.state.amount != 0 ? this.state.amount : ''}
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
                {this.state.expanded ?
                    <ListItemSettings
                        listProps={this.props.listProps}
                        listData={this.props.listData}
                        onTaxChecked={this.props.onTaxChecked}
                        onUnitPricingChecked={this.props.onUnitPricingChecked}
                        onListItemDelete={this.props.onListItemDelete}
                    />
                : null}
            </div>
        );
    }

});

export default ListItem;
