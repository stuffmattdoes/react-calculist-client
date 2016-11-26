// Actions
var ServerActions = require("../actions/ServerActions");

const LocalStorageUtils = {
    itemGetAll: function() {
        var rawItems = JSON.parse(localStorage.getItem('items'));
        ServerActions.default.receiveAllItems(rawItems);
        // console.log("localStorateUtils: itemsGetAll()", rawItems);
    },

    listGetAll: function() {
        var rawLists = JSON.parse(localStorage.getItem('lists'));
        ServerActions.default.receiveAllLists(rawLists);
        // console.log("localStorateUtils: listsGetAll()", rawLists);
    }
}

export default LocalStorageUtils;
