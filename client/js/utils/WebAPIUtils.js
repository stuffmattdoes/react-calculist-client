// Actions
var ServerActions = require("../actions/ServerActions");
import $ from 'jquery';

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

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
        // console.log("Create item:", title, listID, itemID);

        // var rawItems = JSON.parse(localStorage.getItem('items'));
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

        // console.log(newItem);

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(newItem),
            method: "POST",
            url: API_URLS.items + '/'+ itemID
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: POST success!", data, textStatus, jqXHR);

            // Local storage push
            // rawItems.push(newItem);
            // localStorage.setItem('items', JSON.stringify(rawItems));
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    itemDelete: function(itemID) {

        // Local Storage
        // var rawItems = JSON.parse(localStorage.getItem('items'));
        var d = $.Deferred();
        // var deleteItem = {
        //     itemID: itemID
        // }

        // console.log(API_URLS.items + '/' + itemID);

        $.ajax({
            // contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            // data: JSON.stringify(deleteItem),
            method: "DELETE",
            url: API_URLS.items + '/' + itemID
        }).done((data, textStatus, jqXHR) => {
            // console.log(data, textStatus, jqXHR);
            // rawItems.forEach(function(value, index) {
            //     if (id == value.id) {
            //         rawItems.splice(index, 1);
            //     }
            // });
            // localStorage.setItem('items', JSON.stringify(rawItems));
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    itemGetAll: function() {

        // Local Storage
        // var rawItems = JSON.parse(localStorage.getItem('items'));

        // API
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            dataType: "json",
            method: "GET",
            url: API_URLS.items
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: Success!", data, textStatus, jqXHR);
            ServerActions.default.receiveAllItems(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    itemUpdate: function(itemID, updates) {

        // Localstorage
        // var rawItems = JSON.parse(localStorage.getItem('items'));
        // localStorage.setItem('items', JSON.stringify(rawItems));

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
            method: "PUT",
            url: API_URLS.items + '/' + itemID
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: Success!", data, textStatus, jqXHR);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });
    },


    // ==================================================
    // List API
    // ==================================================

    listCreate: function(listID, listTitle, listOwner) {
        // console.log("Web API Utils: Create list", listID, listTitle);
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
            method: "POST",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: POST success!", data, textStatus, jqXHR);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    listDelete: function(listID) {
        // Local Storage
        // var rawItems = JSON.parse(localStorage.getItem('items'));
        var d = $.Deferred();

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            // data: JSON.stringify(deleteItem),
            method: "DELETE",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            // console.log(data, textStatus, jqXHR);
            // rawItems.forEach(function(value, index) {
            //     if (id == value.id) {
            //         rawItems.splice(index, 1);
            //     }
            // });
            // localStorage.setItem('items', JSON.stringify(rawItems));
            d.resolve();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    listGetAll: function() {
        // console.log("listGetAll");
        var d = $.Deferred();

        $.ajax({
            context: document.body,
            dataType: "json",
            method: "GET",
            url: API_URLS.lists
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: Success!", data, textStatus, jqXHR);
            ServerActions.default.receiveAllLists(data);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    listUpdate: function(listID, updates) {
        // Localstorage
        // var rawItems = JSON.parse(localStorage.getItem('items'));
        // localStorage.setItem('items', JSON.stringify(rawItems));

        var d = $.Deferred();
        var updateList =  {
            updates: updates
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(updateList),
            dataType: "json",
            method: "PUT",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            // console.log("WebAPIUtils: Success!", data, textStatus, jqXHR);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });
    },
/*
    updateProperties: function(obj, updates) {

        // Iterate through our updates
        for (var key in updates) {
            // 'updates' gets the entire object
            // 'key' gets the property
            // 'updates[key]' gets the value

            // Is this property an object? And does our object have the same object property?
            if (typeof updates[key] === 'object'
                && obj.hasOwnProperty(key)) {
                this.updateProperties(obj[key], updates[key]);
            } else {
                if (key in obj) {
                    obj[key] = updates[key];
                }
            }
        }

    },
*/

    // ==================================================
    // Auth API
    // ==================================================

    userRegister: function(creds) {
        console.log("Registration API call", creds);

        var d = $.Deferred();

        $.ajax({
            contentType: 'application/json; charset=UTF-8',
            context: document.body,
            data: JSON.stringify(creds),
            dataType: 'json',
            method: 'POST',
            url: API_URLS.auth + '/register'
        }).done((data, textStatus, jqXHR) => {
            console.log('User registration success!', data, textStatus, jqXHR);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.log('User registration failed.', jqXHR, textStatus, errorThrown);
            // ServerActions.default.receiveAllItems(data);
            d.reject();
        });
    },

    userLogin: function(creds) {
        console.log("Login API call", creds);
        
        var d = $.Deferred();

        $.ajax({
            contentType: 'application/json; charset=UTF-8',
            context: document.body,
            data: JSON.stringify(creds),
            dataType: 'json',
            method: 'POST',
            url: API_URLS.auth + '/login'
        }).done((data, textStatus, jqXHR) => {
            console.log('User login success!', data, textStatus, jqXHR);
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.log('User login failed :/', jqXHR, textStatus, errorThrown);
            d.reject();
        });
    }

};

export default WebAPIUtils;
