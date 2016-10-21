import React from 'react';

const ListItemSettings = React.createClass({

    propTypes: {
        listProps: React.PropTypes.object.isRequired,
        onListItemDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function () {

        return {
            taxed: this.props.listProps.taxed,
            unitPricing: this.props.listProps.unitPricing.active
        };
    },

    onTaxedChanged: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            taxed: inputValue
        });

        this.props.onTaxedChanged(inputValue);
    },

    onUnitPricingChanged: function(e) {
        const inputValue = e.target.checked;
        this.setState({
            unitPricing: inputValue
        });

        this.props.onUnitPricingChanged(inputValue);
    },

    render: function() {
        var uniqueId2 = "checkbox-" + this.props.listProps.id + "-2";
        var uniqueId3 = "checkbox-" + this.props.listProps.id + "-3";

        var checkboxClass = 'list-item-checkbox';

        // if (this.state.checked) {
        //     checkboxClass += ' list-item-checkbox-checked';
        // }

        return (
            <div className="list-item-options">
                <div className="list-form">
                    <div className="input-group">
                        <input
                            id={uniqueId2}
                            type="checkbox"
                            onChange={this.onTaxedChanged}
                            checked={this.state.taxed}
                            value=""
                        />
                        <label className="list-item-checkbox-label" htmlFor={uniqueId2}><span className={checkboxClass}></span></label>
                        <p>This item is taxed</p>
                    </div>

                    {this.state.taxed ?
                        <div className="input-group-sub">
                            <p>Tax rate %</p>
                            <input
                                className="list-item-input-number"
                                type="text"
                            />
                        </div>
                    : null}
                    <div className="input-group">
                        <input
                            id={uniqueId3}
                            type="checkbox"
                            onChange={this.onUnitPricingChanged}
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
                            />

                            <br></br>

                            <p>Quantity</p>
                            <input
                                className="list-item-input-number"
                                type="text"
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
