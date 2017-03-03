import React from 'react';

// actions
import ItemActions from '../actions/ItemActions';

// stores
// import ItemStore from '../stores/ItemStore';

const Filter = React.createClass({

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
        let count = this.props.itemsCount.unchecked + this.props.itemsCount.checked;
        let classAll = 'filter__option';
        let classIncomplete = 'filter__option';
        let classComplete = 'filter__option';

        switch (this.props.filter) {
            case 'SHOW_ALL' :
                classAll += ' active';
                break;
            case 'SHOW_INCOMPLETE' :
                classIncomplete += ' active';
                break;
            case 'SHOW_COMPLETE' :
                classComplete += ' active';
                break;
        }

        return (
            <div className='filter'>
                <ul className="filter__list">
                    <li
                        className={ classAll }
                        onClick={ () => {this.onFilterClick('SHOW_ALL')} }
                    >All ({count})</li>
                    <li
                        className={ classIncomplete }
                        onClick={ () => { this.onFilterClick('SHOW_INCOMPLETE')} }
                    >Unchecked ({ this.props.itemsCount.unchecked})</li>
                    <li
                        className={ classComplete }
                        onClick={ () => {this.onFilterClick('SHOW_COMPLETE')} }
                    >Checked ({ this.props.itemsCount.checked })</li>
                </ul>
            </div>
        );
    }
});

export default Filter;
