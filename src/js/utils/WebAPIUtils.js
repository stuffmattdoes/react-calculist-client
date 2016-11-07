// Actions
var ServerActions = require("../actions/ServerActions");

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

const WebAPIUtils = {
    getAllLists: function() {
        console.log("Web API Utils: Get all lists");

        // Simulate receiving data from a database
        var rawLists = JSON.parse(localStorage.getItem('lists'));

        // Simulate success callback
        ServerActions.default.receiveAllLists(rawLists);
    },

    createList: function() {
        console.log("Web API Utils: Create list");
        var rawLists = JSON.parse(localStorage.getItem('lists'));
        // Create item

        // Store item
        localStorage.setItem('lists', JSON.stringify(rawLists));
    },

    createItem: function(itemID, title) {
        console.log("Create item", itemID, title);
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

        // Simulate success callback below
        setTimeout(function() {
            // ServerActions.receiveAllLists
            console.log("Callback");
        }, 0);

    }

};

export default WebAPIUtils;
