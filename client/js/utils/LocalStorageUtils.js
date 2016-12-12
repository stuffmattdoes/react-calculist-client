// Actions
var ServerActions = require("../actions/ServerActions");

const LocalStorageUtils = {
    itemGetAll: function() {
        var rawItems = JSON.parse(localStorage.getItem('items'));
        if (rawItems) {
            ServerActions.default.receiveAllItems(rawItems);
            return true;
        }
        return false;
    },

    listGetAll: function() {
        var rawLists = JSON.parse(localStorage.getItem('lists'));
        if (rawLists) {
            // console.log("LocalStorageUtils: listGetAll");
            ServerActions.default.receiveAllLists(rawLists);
            return true;
        }
        return false;
    }
}

export default LocalStorageUtils;
