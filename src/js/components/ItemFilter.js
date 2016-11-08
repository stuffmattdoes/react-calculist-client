import React from 'react';

const ItemFilter = React.createClass({

    propTypes: {
        filter: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
    //     onFilterClick: React.PropTypes.func.isRequired
    },

    render: function() {
        var filterActiveClass = "active"
        var itemsAll = 0;
        var itemsUnchecked = 0;
        var itemsChecked = 0;

        this.props.items.forEach(function(value, index) {
            itemsAll ++;

            if (value.checked == false) {
                itemsUnchecked ++;
            } else {
                itemsChecked ++;
            }
        });

        return (
            <div className="list-item-filter">
                <ul>
                    <li
                        onClick={function() {this.props.onFilterClick("all")}.bind(this)}
                    >All ({itemsAll})</li>
                    <li
                        onClick={function() {this.props.onFilterClick("unchecked")}.bind(this)}
                    >Unchecked ({itemsUnchecked})</li>
                    <li
                        onClick={function() {this.props.onFilterClick("checked")}.bind(this)}
                    >Checked ({itemsChecked})</li>
                </ul>
            </div>
        );
    }
})

export default ItemFilter;
