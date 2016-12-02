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
const API_URLS = {
    items: API_PREFIX + '/items',
    lists: API_PREFIX + '/lists'
}

const WebAPIUtils = {

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
            ID: itemID,
            listID: listID
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(newItem),
            method: "POST",
            url: API_URLS.items
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
        var deleteItem = {
            ID: itemID
        }

        // console.log(API_URLS.items + '/' + itemID);

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            // data: JSON.stringify(deleteItem),
            method: "DELETE",
            url: API_URLS.items + '/' + itemID
        }).done((data, textStatus, jqXHR) => {
            console.log(data, textStatus, jqXHR);
            // rawItems.forEach(function(value, index) {
            //     if (id == value.id) {
            //         rawItems.splice(index, 1);
            //     }
            // });
            // localStorage.setItem('items', JSON.stringify(rawItems));
            d.resolve();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR, textStatus, errorThrown);
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

        // Update item here

        // localStorage.setItem('items', JSON.stringify(rawItems));

        var d = $.Deferred();

        $.ajax({
            context: document.body,
            dataType: "json",
            method: "PUT",
            url: API_URLS.items
        });

    },

    listCreate: function(listID, listTitle) {
        // console.log("Web API Utils: Create list", listID, listTitle);
        var d = $.Deferred();
        var newList =  {
            "title": listTitle,
            "ID": listID
        }

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            data: JSON.stringify(newList),
            method: "POST",
            url: API_URLS.lists
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
        var deleteList = {
            ID: listID
        }

        // console.log(API_URLS.items + '/' + itemID);

        $.ajax({
            contentType: 'application/json; charset=UTF-8', // This is the money shot
            context: document.body,
            // data: JSON.stringify(deleteItem),
            method: "DELETE",
            url: API_URLS.lists + '/' + listID
        }).done((data, textStatus, jqXHR) => {
            console.log(data, textStatus, jqXHR);
            // rawItems.forEach(function(value, index) {
            //     if (id == value.id) {
            //         rawItems.splice(index, 1);
            //     }
            // });
            // localStorage.setItem('items', JSON.stringify(rawItems));
            d.resolve();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            d.reject();
        });

        return d;
    },

    listGetAll: function() {
        // console.log("WebAPIUtils: listGetAll");
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

    listUpdate: function() {
        // Simulate success callback
        // console.log("Web API Utils: Update list");
    },

};

export default WebAPIUtils;
