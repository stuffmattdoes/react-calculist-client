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
        var itemsCount = ItemStore.getCurrentListItemCount(),
            itemsAll = itemsCount.unchecked + itemsCount.checked;

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
                    >Unchecked ({itemsCount.unchecked})</li>
                    <li
                        className={this.props.filter == "SHOW_CHECKED" ? "active" : null}
                        onClick={function() {this.onFilterClick("SHOW_CHECKED")}.bind(this)}
                    >Checked ({itemsCount.checked})</li>
                </ul>
            </div>
        );
    }
});

export default ItemFilter;
