// Libraries
import React from 'react';

// Components
import Header from './Header';
import ItemView from './ItemView';
import ListSettings from './ListSettings';
import ListView from './ListView';

// Actions
import * as AuthActions from '../actions/AuthActions';
import * as ListActions from '../actions/ListActions';

// Stores
import AuthStore from '../stores/AuthStore';
import ListStore from '../stores/ListStore';
import ItemStore from '../stores/ItemStore';

// Utils
import AuthUtils from '../utils/AuthUtils';
import ApiUtils from '../utils/ApiUtils';

// Application class
const App = React.createClass({

    getInitialState: function() {
        return {
            currentListID: null,
            listsData: [],
            currentList: null,
            receivedLists: false,
            receivedItems: false,
            ListSettingsActive: false,
            userAuth: false
        };
    },

    getStateFromStores: function() {
        return {
            currentListID: ListStore.getCurrentListID(),
            listsData: ListStore.getAll(),
            currentList: ListStore.getCurrentList()
        };
    },

    onStoreChange: function() {
        this.setState(this.getStateFromStores());
    },

    checkForCurrentList: function() {
        // Check for current List ID
        if (!ListStore.getCurrentListID()
            && this.props.params.listID) {
            ListActions.default.setCurrentList(this.props.params.listID);
            return ListStore.getCurrentListID();
        }
    },

    componentWillMount: function() {
        // localStorage.clear();

        // Token refresh
        // If we've gotten to this component, we've clearly got credentials in local storage. Let's verify those.
        if (AuthStore.getUser() === null && AuthStore.getToken() === null) {
            // console.log('Refresh token');
            ApiUtils.tokenRefresh().done( () => {
                // console.log('Refresh success!');
                AuthActions.default.setUser(localStorage.getItem('user'));
                AuthActions.default.setToken(localStorage.getItem('jwt'));
                this.initData();
            }).fail( () => {
                // console.log('Refresh failure :/');
                AuthActions.default.userLogout();
            });
        } else {
            this.initData();
        }

        AuthStore.on('USER_AUTH', this.onStoreChange);
        ListStore.on('CHANGE_LIST', this.onStoreChange);
    },

    initData: function() {
        this.getLists();
        this.getItems();
        this.setState({
            userAuth: true
        });
    },

    getLists: function() {
        let user = AuthStore.getUser();

        ApiUtils.listGetAll(user).done( () => {
            this.setState({
                listsData: ListStore.getAll()
            });
        }).always( () => {
            this.setState({
                receivedLists: true
            })
        });
    },

    getItems: function() {
        ApiUtils.itemGetAll().done(() => {
            this.setState({
                itemsData: ItemStore.getAll()
            });
        }).always( () => {
            this.setState({
                receivedItems: true
            })
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
        // console.log(this.state.receivedLists, this.state.receivedItems, this.state.userAuth);
        if (!this.state.receivedLists || !this.state.receivedItems || !this.state.userAuth) {
            return (
                <div className="loader">Loading...</div>
            );
        };
        
        // Send properties to children
        const childrenWithProps = React.Children.map(this.props.children, child => {

            switch(child.type) {
                case ListView : {
                    return React.cloneElement(child, {
                        listsData: this.state.listsData
                    });
                    break;
                }
                case ItemView : {
                    return React.cloneElement(child, {
                        itemsData: [],
                        routeParams: this.props.params
                    });
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
