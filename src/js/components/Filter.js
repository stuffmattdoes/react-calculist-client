import React from 'react';

// actions
import ItemActions from '../actions/ItemActions';

// stores
import ItemStore from '../stores/ItemStore';

const Filter = React.createClass({
    getInitialState: function() {
        return {
            filter: 'SHOW_ALL'
        }
    },

    onFilterClick: function(filter) {
        this.setState({
            filter: filter
        })
    },

    render: function() {
        let items = ItemStore.getAll();

        let itemsCount = 0;
        let itemsCheckedCount = 0;
        let itemsUncheckedCount = 0;

        items.forEach((value, index) => {
            value.checked ? itemsCheckedCount ++ : itemsUncheckedCount ++;
            itemsCount ++;
        });

        let classAll = 'filter__option';
        let classIncomplete = 'filter__option';
        let classComplete = 'filter__option';

        switch (this.state.filter) {
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
                    >All ({ itemsCount })</li>
                    <li
                        className={ classIncomplete }
                        onClick={ () => { this.onFilterClick('SHOW_INCOMPLETE')} }
                    >Unchecked ({ itemsUncheckedCount })</li>
                    <li
                        className={ classComplete }
                        onClick={ () => {this.onFilterClick('SHOW_COMPLETE')} }
                    >Checked ({ itemsCheckedCount })</li>
                </ul>
            </div>
        );
    }
});

export default Filter;
