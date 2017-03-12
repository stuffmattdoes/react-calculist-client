// Libraries
import React from 'react';
import { hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import AddItem from './AddItem';
import Header from './Header';

// Actions
import ListActions from '../actions/ListActions';

// Stores
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

const ListView = React.createClass({

    // getInitialState: function() {
    //     return this.getStateFromStores();
    // },

    // getStateFromStores: function() {
    //     return {
    //         lists: ListStore.getAll()
    //     }
    // },

    onStoreChange: function() {
        this.forceUpdate();
        // this.setState(this.getStateFromStores());
    },

    onListClick: function(listID) {
        ListActions.setCurrentList(listID);
        this.props.router.push('/lists/' + listID + '/');
    },

    toggleAccount: function(e) {
        hashHistory.push('/account/');
    },

    componentWillMount: function() {
        ListStore.on('CHANGE_LIST', this.onStoreChange);
    },

    componentWillUnmount: function() {
        ListStore.removeListener('CHANGE_LIST', this.onStoreChange);
    },

    render: function() {
        let lists = ListStore.getAll();

        let totalLists = lists.map((list, index) => {
            let listItemCount = ItemStore.getAllForList((list.listID)).reduce((total, item) => {
                if (!item.checked) {
                    total++;
                }
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
            <div className="list-view view-transition" >
                <Header
                    buttonLeft={this.toggleAccount}
                    buttonRight={null}
                    buttonBack={false}
                    buttonOptions={false}
                    params={this.props.params}
                    title="Calculist"
                />
                <div className="list__scroll list__scroll--full">
                    <div className="list__container">
                        <ReactCSSTransitionGroup
                            transitionName='list-item-transition'
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            { totalLists }
                        </ReactCSSTransitionGroup>
                    </div>
                    <AddItem condActions={"ListActions"} />
                </div>
            </div>
        );
    }
});

export default ListView;
