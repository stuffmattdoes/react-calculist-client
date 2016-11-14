import React from 'react';

// actions
import * as ItemActions from '../actions/ItemActions';

// stores
import ItemStore from '../stores/ItemStore';

const ItemFilter = React.createClass({

    propTypes: {
        filter: React.PropTypes.string.isRequired,
    },

    onFilterClick: function(filter) {
        ItemActions.default.itemSetVisibilityFilter(
            filter
        );
    },

    render: function() {
        var itemsAll = ItemStore.getListItemCount(),
            itemsUnchecked = 0,
            itemsChecked = 0;

        console.log(this.props.filter);

        return (
            <div className="list-item-filter">
                <ul>
                    <li
                        className={this.props.filter == "SHOW_ALL" ? "active" : null}
                        onClick={function() {this.onFilterClick("SHOW_ALL")}.bind(this)}
                    >All ({itemsAll})</li>
                    <li
                        className={this.props.filter == "SHOW_UNCHECKED" ? "active" : null}
                        onClick={function() {this.onFilterClick("SHOW_UNCHECKED")}.bind(this)}
                    >Unchecked ({itemsUnchecked})</li>
                    <li
                        className={this.props.filter == "SHOW_CHECKED" ? "active" : null}
                        onClick={function() {this.onFilterClick("SHOW_CHECKED")}.bind(this)}
                    >Checked ({itemsChecked})</li>
                </ul>
            </div>
        );
    }
});

export default ItemFilter;
