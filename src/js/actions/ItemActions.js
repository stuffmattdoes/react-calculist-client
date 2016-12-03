import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ItemActions = {

    itemCreate: function(title, listID) {
        // console.log("ItemActions: itemCreate", title, listID);
        var itemID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        dispatcher.dispatch({
            type: "CREATE_ITEM",
            itemID: itemID,
            listID: listID,
            title: title
        });

        // API action call
        WebAPIUtils.itemCreate(title, listID, itemID);
    },

    itemDelete: function(itemID) {
        // console.log("Action: delete list item");
        dispatcher.dispatch({
            type: "DELETE_ITEM",
            itemID: itemID
        });

        // API action call
        WebAPIUtils.itemDelete(itemID);
    },

    itemSetVisibilityFilter: function(filter) {
        dispatcher.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: filter
        });
    },

    itemUpdate: function(itemID, updates) {
        // console.log("itemUpdate");
        dispatcher.dispatch({
            type: "UPDATE_ITEM",
            itemID: itemID,
            updates: updates
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            updates
        );
    },

}

export default ItemActions;
