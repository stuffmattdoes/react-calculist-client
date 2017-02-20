import Dispatcher from '../dispatcher/Dispatcher';

const ServerActions = {
    receiveAllItems: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_RAW_ITEMS',
            rawItems: data
        });
    },

    receiveAllLists: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_RAW_LISTS',
            rawLists: data
        });
    },

    receiveTokenRefreshSuccess: function(data) {
        console.log(data);
        Dispatcher.dispatch({
            type: 'RECEIVE_TOKEN_REFRESH_SUCCESS'
            // response: data
        });
    },

    receiveTokenRefreshError: function(data) {
        console.log(data);
        Dispatcher.dispatch({
           type: 'RECEIVE_TOKEN_REFRESH_ERROR'
            // response: data
        });
    },

    receiveUserLoginSuccess: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_LOGIN_SUCCESS',
            response: data
        });
    },

    receiveUserLoginError: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_LOGIN_ERROR',
            response: data
        });
    },

    receiveUserRegisterSuccess: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_REGISTER_SUCCESS',
            response: data
        });
    },

    receiveUserRegisterError: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_REGISTER_ERROR',
            response: data
        });
    },

}

export default ServerActions;
