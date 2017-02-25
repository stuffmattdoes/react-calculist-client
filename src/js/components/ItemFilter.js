import React from 'react';

// actions
import ItemActions from '../actions/ItemActions';

// stores
// import ItemStore from '../stores/ItemStore';

const ItemFilter = React.createClass({

    propTypes: {
        filter: React.PropTypes.string.isRequired,
        itemsCount: React.PropTypes.object.isRequired
    },

    onFilterClick: function(filter) {
        ItemActions.itemSetVisibilityFilter(
            filter
        );
    },

    render: function() {
        var itemsAll = this.props.itemsCount.unchecked + this.props.itemsCount.checked;

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
                    >Unchecked ({this.props.itemsCount.unchecked})</li>
                    <li
                        className={this.props.filter == "SHOW_CHECKED" ? "active" : null}
                        onClick={function() {this.onFilterClick("SHOW_CHECKED")}.bind(this)}
                    >Checked ({this.props.itemsCount.checked})</li>
                </ul>
            </div>
        );
    }
});

export default ItemFilter;
