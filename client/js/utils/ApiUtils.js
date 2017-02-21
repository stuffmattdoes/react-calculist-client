// Libraries
import axios from 'axios';

// Actions
import ServerResponseActions from '../actions/ServerResponseActions';
import AuthActions from '../actions/AuthActions';

const API_PREFIX = '/api';
const API_VERSION = '/v1.0';
const API_URLS = {
    items: API_PREFIX + '/items',
    lists: API_PREFIX + '/lists',
    auth: API_PREFIX + '/auth'
}

const WebAPIUtils = {

    // ==================================================
    // Items API
    // ==================================================

    itemCreate: function(title, listID, itemID) {
        var d = $.Deferred();
        var newItem = {
            title: title,
            checked: false,
            amount: 0.00,
            tax: {
                active: false,
                singleTaxRate: 0.0
            },
            unitPricing: {
                active: false,
                price: 0.00,
                quantity: 0
            },
            itemID: itemID,
            listID: listID
        };

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(newItem),
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "POST",
            url: API_URLS.items + '/'+ itemID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });

        return d;
    },

    itemDelete: function(itemID) {
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "DELETE",
            url: API_URLS.items + '/' + itemID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });

        return d;
    },

    itemGetAll: function() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        axios.get(API_URLS.items, config)
        .then(response => {
            // console.log(response);
            ServerResponseActions.receiveAllItems(response.data);
        })
        .catch(error => {
            // console.log('Error:', error);
        });
    },

    itemUpdate: function(itemID, updates) {
        var d = $.Deferred();
        var updateItem =  {
            itemID: itemID,
            updates: updates
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(updateItem),
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "PUT",
            url: API_URLS.items + '/' + itemID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });
    },


    // ==================================================
    // List API
    // ==================================================

    listCreate: function(listID, listTitle, listOwner) {
        var d = $.Deferred();
        var newList =  {
            listID: listID,
            owner: listOwner,
            title: listTitle
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(newList),
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "POST",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });

        return d;
    },

    listDelete: function(listID) {
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "DELETE",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            d.reject();
        });

        return d;
    },

    listGetAll: function(user) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        axios.get(API_URLS.lists, config)
        .then(response => {
            // console.log(response);
            ServerResponseActions.receiveAllLists(response.data);
        })
        .catch(error => {
            // console.log('Error:', error);
        });

    },

    listUpdate: function(listID, updates) {
        var d = $.Deferred();
        var updateList =  {
            updates: updates
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(updateList),
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "PUT",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });
    },


    // ==================================================
    // Auth API
    // ==================================================

    userRegister: function(creds) {
        var d = $.Deferred();

        $.ajax({
            contentType: 'application/json; charset=UTF-8',
            context: document.body,
            data: JSON.stringify(creds),
            dataType: 'json',
            method: 'POST',
            url: API_URLS.auth + '/register'
        }).done((data, textStatus, jqXHR) => {
            ServerResponseActions.default.receiveUserRegisterSuccess(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            ServerResponseActions.default.receiveUserRegisterError(jqXHR);
            d.reject();
        });
    },

    userLogin: function(creds) {
        axios.post(API_URLS.auth + '/login', creds)
        .then(response => {
            ServerResponseActions.receiveUserLoginSuccess(response.data);
        })
        .catch(error => {
            AuthActions.default.userLogout();
            ServerResponseActions.receiveUserLoginError(error);
        });
    },

    tokenRefresh: function() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        let data = {
            jwt: localStorage.getItem('jwt'),
            user: localStorage.getItem('user')
        };

        let p1 = new Promise((resolve, reject) => {
            axios.get(API_URLS.auth + '/refresh', config)
            .then(response => {
                // console.log(response);
                ServerResponseActions.receiveTokenRefreshSuccess(data);
                resolve();
            })
            .catch(error => {
                // console.log(error);
                ServerResponseActions.receiveTokenRefreshError(error);
                AuthActions.userLogout();
                reject();
            });
        });

        return p1;
    }

};

export default WebAPIUtils;
