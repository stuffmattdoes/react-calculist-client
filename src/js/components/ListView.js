// Libraries
import React from 'react';

// Components
import AddItem from './AddItem';

// Actions
import ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

const ListView = React.createClass({

    onListClick: function(listID) {
        ListActions.setCurrentList(listID);
        this.props.router.push('/lists/' + listID + '/');
    },

    render: function() {
        let lists = ListStore.getAll();

        let totalLists = lists.map((list, index) => {
            let listItemCount = ItemStore.getAllForList((list.listID)).reduce((total, item) => {
                !item.checked ? total ++ : total;
                return total;
            }, 0);

            return (
                <div
                    className="list-item list-item--big"
                    key={list.listID}
                    onClick={() => {this.onListClick(list.listID);}}
                >
                    <div className="list-item__container">
                        <p className="list-item__title">{list.title}</p>
                        {listItemCount > 0 ?
                            <div className="list-item__count">{listItemCount}</div>
                        :
                            null
                        }
                    </div>
                </div>
            );
        });

        return (
            <div className="list-view">
                <div className="list__scroll list__scroll--full">
                    <div className="list__container">
                        {totalLists.length > 0 ? totalLists : null}
                    </div>
                    <AddItem condActions={"ListActions"} />
                </div>
            </div>
        );
    }
});

export default ListView;
