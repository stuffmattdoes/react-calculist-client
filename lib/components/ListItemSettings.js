import React from 'react';

const ListItemSettings = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        listData: React.PropTypes.object.isRequired,
        onListItemDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            tax: this.props.listProps.tax.active,
            taxRate: this.props.listData.taxRate,
            unitPricing: this.props.listProps.unitPricing.active,
            unitPrice: this.props.listProps.unitPricing.price,
            unitQuantity: this.props.listProps.unitPricing.quantity
        };
    },

    // componentDidMount: function() {
    //     console.log(this.state.unitPricing);
    // },

    onTaxChecked: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            tax: inputValue
        });
        this.props.onTaxChecked(inputValue);
    },

    onTaxChanged: function(e) {
        const inputValue = e.target.value;
        this.setState({
            taxRate: inputValue
        });
    },

    onUnitPricingChecked: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            unitPricing: inputValue
        });
        this.props.onUnitPricingChecked(inputValue);
    },

    onUnitPriceChanged: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            taxRate: inputValue
        });
    },

    onUnitQuantityChanged: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            taxRate: inputValue
        });
    },

    render: function() {
        var uniqueId2 = "checkbox-" + this.props.listProps.id + "-2";
        var uniqueId3 = "checkbox-" + this.props.listProps.id + "-3";
        var checkboxClass = 'list-item-checkbox';

        return (
            <div className="list-item-options">
                <div className="list-form">
                    <div className="input-group">
                        <input
                            id={uniqueId2}
                            type="checkbox"
                            onChange={this.onTaxChecked}
                            checked={this.state.tax.active}
                            value=""
                        />
                        <label className="list-item-checkbox-label" htmlFor={uniqueId2}><span className={checkboxClass}></span></label>
                        <p>This item is taxed</p>
                    </div>

                    {this.state.tax ?
                        <div className="input-group-sub">
                            <p>Tax rate</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                value={this.props.listData.taxRate}
                                onChange={this.onTaxChanged}
                            />
                        </div>
                    : null}
                    <div className="input-group">
                        <input
                            id={uniqueId3}
                            type="checkbox"
                            onChange={this.onUnitPricingChecked}
                            checked={this.state.unitPricing}
                            value=""
                        />
                        <label className="list-item-checkbox-label" htmlFor={uniqueId3}><span className={checkboxClass}></span></label>
                        <p>Unit pricing</p>
                    </div>
                    {this.state.unitPricing ?
                        <div className="input-group-sub">
                            <p>Price per unit</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                onChange={this.onUnitPriceChanged}
                                value="1.00"
                            />

                            <br></br>

                            <p>Quantity</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                                onChange={this.onUnitQuantityChanged}
                                value="2"
                            />
                        </div>
                    : null}
                    <div className="list-delete">
                        <span
                            className="list-delete-button"
                            onClick={this.props.onListItemDelete}
                        >
                            Delete
                        </span>
                    </div>
                </div>
            </div>
        );
    }

});

export default ListItemSettings;
