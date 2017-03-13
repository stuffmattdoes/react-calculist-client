// Libraries
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Actions
import AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

// Utils
import ApiUtils from '../utils/ApiUtils';

// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            accountActive: false,
            currentList: null,
            listSettingsActive: false,
            loading: true
        };
    },

    getStateFromStores: function() {
        let isLoading = true;
        let user = !!AuthStore.getUser();
        let token = !!AuthStore.getToken();
        let lists = !!ListStore.getAll();
        let items = !!ItemStore.getAll();

        if (user && token && lists && items) {
            isLoading = false;
        }

        return {
            currentList: ListStore.getCurrentList(),
            loading: isLoading
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    componentWillMount: function() {
        // localStorage.clear();
        this.tokenRefresh();

        if (this.props.params.listID) {
            ListStore.setCurrentList(this.props.params.listID);
        }

        AuthStore.on('USER_AUTH', this.onStoreChange);
        ItemStore.on('CHANGE_ITEM', this.onStoreChange);
        ListStore.on('CHANGE_LIST', this.onStoreChange);
    },

    componentWillUnmount: function() {
        AuthStore.removeListener('USER_AUTH', this.onStoreChange);
        ItemStore.removeListener('CHANGE_ITEM', this.onStoreChange);
        ListStore.removeListener('CHANGE_LIST', this.onStoreChange);
    },

    initData: function() {
        ApiUtils.GetListsAndItems();
    },

    tokenRefresh: function() {
        // Token refresh
        // If we've gotten to this component, we've got a token in local storage. Let's verify it
        if (AuthStore.getUser() === null && AuthStore.getToken() === null) {
            ApiUtils.tokenRefresh().then(() => {
                this.initData();
            }).catch(() => {
                AuthActions.userLogout();
            });
        } else {
            this.initData();
        }
    },

    render: function() {
        var path = this.props.location.pathname;
        var segment = path.split('/').filter((element) => {
           return element.length != 0;
        });

        // var segment = path.split('/')[2] || 'root';

        return (
            <div className="app">
                {this.state.loading ?<div className="loader"></div> :
                    <ReactCSSTransitionGroup
                        transitionName='view-transition'
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={250}>
                        {React.cloneElement(this.props.children, { key: path })}
                    </ReactCSSTransitionGroup>}
            </div>
        );
    }
});

export default App;
