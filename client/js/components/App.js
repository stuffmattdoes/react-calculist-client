// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListSettings from './ListSettings';
import ListView from './ListView';

// Actions
import * as AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';
import ListStore from '../stores/ListStore';

// Utils
import ApiUtils from '../utils/ApiUtils';

// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            currentList: null,
            receivedLists: false,
            receivedItems: false,
            ListSettingsActive: false,
            userAuth: false
        };
    },

    getStateFromStores: function() {
        return {
            currentList: ListStore.getCurrentList()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    componentWillMount: function() {
        // localStorage.clear();
        this.tokenRefresh();
        AuthStore.on('USER_AUTH', this.onStoreChange);
        ListStore.on('CHANGE_LIST', this.onStoreChange);
    },

    initData: function() {
        this.getListsFromAPI();
        this.getItemsFromAPI();
        this.setState({
            userAuth: true
        });
    },

    tokenRefresh: function() {
        // Token refresh
        // If we've gotten to this component, we've got a token in local storage. Let's verify it
        if (AuthStore.getUser() === null && AuthStore.getToken() === null) {
            ApiUtils.tokenRefresh().done( () => {
                AuthActions.default.setUser(localStorage.getItem('user'));
                AuthActions.default.setToken(localStorage.getItem('jwt'));
                this.initData();
            }).fail( () => {
                AuthActions.default.userLogout();
            });
        } else {
            this.initData();
        }
    },

    getListsFromAPI: function() {
        let user = AuthStore.getUser();

        ApiUtils.listGetAll(user).always( () => {
            this.setState({
                receivedLists: true
            });
        });
    },

    getItemsFromAPI: function() {
        ApiUtils.itemGetAll().always( () => {
            this.setState({
                receivedItems: true
            });
        });;
    },

    componentWillUnmount: function() {
        AuthStore.removeListener('USER_AUTH', this.onStoreChange);
        ListStore.removeListener('CHANGE_LIST', this.onStoreChange);
    },

    toggleSettings: function() {
        this.setState({
            ListSettingsActive: !this.state.ListSettingsActive
        });
    },

    render: function() {
        // Don't wanna render no components if we ain't got all the lists and items
        if (!this.state.receivedLists || !this.state.receivedItems || !this.state.userAuth) {
            return (
                <div className="loader">Loading...</div>
            );
        };
        
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
                {!this.state.ListSettingsActive ?
                    <Header
                        title={this.state.currentList ? this.state.currentList.title : 'Calculist'}
                        route={this.props.route}
                        params={this.props.params}
                        location={this.props.location}
                        toggleSettings={this.toggleSettings}
                    />
                : null}
                {childrenWithProps}
            </div>
        );
    }
});

export default App;
