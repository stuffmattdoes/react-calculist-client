// Actions
var ServerActions = require("../actions/ServerActions");
import $ from 'jquery';

// Stores
import AuthStore from '../stores/AuthStore';

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
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "GET",
            url: API_URLS.items
        }).done((data, textStatus, jqXHR) => {
            ServerActions.default.receiveAllItems(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });

        return d;
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
            contentType: 'application/json; charset=UTF-8', // This is the money shot
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

    listGetAll: function() {
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: "GET",
            url: API_URLS.lists
        }).done((data, textStatus, jqXHR) => {
            ServerActions.default.receiveAllLists(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            d.reject();
        });

        return d;
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
            ServerActions.default.receiveUserRegisterSuccess(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            ServerActions.default.receiveUserRegisterError(jqXHR);
            d.reject();
        });
    },

    userLogin: function(creds) {
        var d = $.Deferred();

        $.ajax({
            contentType: 'application/json; charset=UTF-8',
            context: document.body,
            data: JSON.stringify(creds),
            dataType: 'json',
            method: 'POST',
            url: API_URLS.auth + '/login'
        }).done((data, textStatus, jqXHR) => {
            ServerActions.default.receiveUserLoginSuccess(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            ServerActions.default.receiveUserLoginError(jqXHR);
            d.reject();
        });


    },

    tokenRefresh: function() {
        var d = $.Deferred();

        $.ajax({
            // contentType: 'application/json; charset=UTF-8',
            context: document.body,
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            method: 'GET',
            url: API_URLS.auth + '/refresh'
        }).done((data, textStatus, jqXHR) => {
            // console.log('token refresh success!', data);
            // ServerActions.default.receiveTokenRefreshSuccess(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log('token refresh failure');
            ServerActions.default.receiveTokenRefreshError(jqXHR);
            d.reject();
        });

        return d;
    }

};

export default WebAPIUtils;
