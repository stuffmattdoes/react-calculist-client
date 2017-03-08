// Libraries
import React from 'react';

// Components
import ItemView from './ItemView';
import ListSettings from './ListSettings';
import ListView from './ListView';

// Actions
import AuthActions from '../actions/AuthActions';
import ListActions from '../actions/ListActions';

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

    toggleSettings: function() {
        this.setState({
            listSettingsActive: !this.state.listSettingsActive
        });
    },

    toggleAccount: function() {
        this.setState({
            accountActive: !this.state.accountActive
        });
    },

    render: function() {
        // Send properties to children
        const childrenWithProps = React.Children.map(this.props.children, child => {

            switch(child.type) {
                case ListView : {
                    return React.cloneElement(child, {});
                    break;
                }
                case ItemView : {
                    return React.cloneElement(child, {});
                    break;
                }
                case ListSettings : {
                    return React.cloneElement(child, {
                        currentList: this.state.currentList,
                        toggleSettings: this.toggleSettings
                    });
                }
            }
        });

        return (
            <div className="app">
                {this.state.loading ?<div className="loader"></div> : childrenWithProps}
            </div>
        );
    }
});

export default App;
