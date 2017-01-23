import Dispatcher from '../dispatcher/Dispatcher';

const ServerActions = {
    receiveAllItems: function(rawItems) {
        Dispatcher.dispatch({
            type: 'RECEIVE_RAW_ITEMS',
            rawItems: rawItems
        });
    },

    receiveAllLists: function(rawLists) {
        Dispatcher.dispatch({
            type: 'RECEIVE_RAW_LISTS',
            rawLists: rawLists
        });
    },

    receiveUserLoginSuccess: function(success) {
        Dispatcher.dispatch({
           type: 'RECEIVE_USER_LOGIN_SUCCESS',
            response: success
        });
    },

    receiveUserLoginError: function(errors) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_LOGIN_ERROR',
            response: errors
        });
    },

    receiveUserRegisterSuccess: function(success) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_REGISTER_SUCCESS',
            response: success
        });
    },

    receiveUserRegisterError: function(errors) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_REGISTER_ERROR',
            response: errors
        });
    },

}

export default ServerActions;
