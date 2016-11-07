// Actions
var ServerActions = require("../actions/ServerActions");

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

const WebAPIUtils = {

    listCreate: function() {
        // Simulate success callback
        console.log("Web API Utils: Create list");
    },

    listDelete: function() {
        // Simulate success callback
        console.log("Web API Utils: Delete List");
    },

    listGetAll: function() {

        // Simulate receiving data from a database
        var rawLists = JSON.parse(localStorage.getItem('lists'));

        // Simulate success callback
        console.log("Web API Utils: Get all lists");
        ServerActions.default.receiveAllLists(rawLists);
    },

    listUpdate: function() {
        // Simulate success callback
        console.log("Web API Utils: Update list");
    },

    itemCreate: function(itemID, title) {

        // Server-side processing
        var rawLists = JSON.parse(localStorage.getItem('lists'));
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
            id: itemID
        }

        // Get list ID. For now, just default to the first list index
        rawLists[0].items.push(newItem);
        localStorage.setItem('lists', JSON.stringify(rawLists));

        // Success callback to client
        setTimeout(function() {
            console.log("Web API Utils: Create item", itemID, title);
        }, 0);
    },

    itemDelete: function(id) {

        // Server side processing
        var rawLists = JSON.parse(localStorage.getItem('lists'));

        rawLists[0].items.forEach(function(value, index) {
            if (id == value.id) {
                rawLists[0].items.splice(index, 1);
                // return false;
            }
        });
        localStorage.setItem('lists', JSON.stringify(rawLists));

        // Success callback to client
        setTimeout(function() {
            console.log("Web API Utils: Item delete", id);
        }, 0);
    },

    itemUpdate: function(itemID, updates) {
        // Server-side processing

        // Success callback to client
        setTimeout(function() {
            console.log("Web API Utils: Item update", itemID, updates);
        }, 0);
    },

};

export default WebAPIUtils;
