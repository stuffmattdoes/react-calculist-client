// Actions
var ServerActions = require("../actions/ServerActions");
var axios = require('axios');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

const WebAPIUtils = {

    itemCreate: function(itemID, title) {

        // Server-side processing
        var rawItems = JSON.parse(localStorage.getItem('items'));
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
        rawItems.push(newItem);
        localStorage.setItem('items', JSON.stringify(rawItems));

        // Success callback to client
        setTimeout(function() {
            // console.log("Web API Utils: Create item", itemID, title);
        }, 0);
    },

    itemDelete: function(id) {

        // Server side processing
        var rawItems = JSON.parse(localStorage.getItem('items'));

        rawItems.forEach(function(value, index) {
            if (id == value.id) {
                rawItems.splice(index, 1);
                // return false;
            }
        });
        localStorage.setItem('items', JSON.stringify(rawItems));

        // Success callback to client
        setTimeout(function() {
            // console.log("Web API Utils: Item delete", id);
        }, 0);
    },

    itemGetAll: function() {

        // Simulate receiving data from a database
        var rawItems = JSON.parse(localStorage.getItem('items'));

        // Simulate success callback
        // console.log("Web API Utils: Get all lists", rawItems);
        ServerActions.default.receiveAllItems(rawItems);
    },

    itemUpdate: function(itemID, updates) {
        // Server-side processing
        var rawItems = JSON.parse(localStorage.getItem('items'));
        rawItems.forEach(function(value, index) {

            // Match our item ID
            if (itemID == value.id) {

                // Iterate through our updates and apply them
                for (var update in updates) {

                    // Is this property an object?
                    if (typeof updates[update] != "object") {

                        // If our store object has a similar property, update it
                        if (value.hasOwnProperty(update)) {
                            value[update] = updates[update];
                        }
                    } else {
                        // Iterate through children object - TEMPORARY FIX. should probs make data object flat instead
                        for (var childUpdate in updates[update]) {
                            if (value[update].hasOwnProperty(childUpdate)) {
                                if (value[update].hasOwnProperty(childUpdate)) {
                                    value[update][childUpdate] = updates[update][childUpdate];
                                }
                            }
                        }
                    }

                }
            }

        }.bind(this));
        localStorage.setItem('items', JSON.stringify(rawItems));

        // Success callback to client
        setTimeout(function() {
            // console.log("Web API Utils: Item update", itemID, updates);
        }, 0);
    },

    listCreate: function(listID, title) {
        // Simulate success callback
        // console.log("Web API Utils: Create list");
    },

    listDelete: function(listID) {
        // Simulate success callback
        // console.log("Web API Utils: Delete List");
    },

    listGetAll: function() {

        // Simulate receiving data from a database
        var rawLists = axios.get('/api/lists', {})
            .then(function (response) {
                // console.log(response.data);
                ServerActions.default.receiveAllLists(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    listUpdate: function() {
        // Simulate success callback
        // console.log("Web API Utils: Update list");
    },

};

export default WebAPIUtils;
