import dispatcher from "../dispatcher/Dispatcher";
import ApiUtils from "../utils/ApiUtils";

const ItemActions = {

    itemCreate: function(title, listID) {
        // console.log("ItemActions: itemCreate", title, listID);
        var itemID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        dispatcher.dispatch({
            type: "CREATE_ITEM",
            itemID: itemID,
            title: title
        });

        // API action call
        ApiUtils.itemCreate(title, listID, itemID);
    },

    itemDelete: function(itemID) {
        // console.log("Action: delete list item");
        dispatcher.dispatch({
            type: "DELETE_ITEM",
            itemID: itemID
        });

        // API action call
        ApiUtils.itemDelete(itemID);
    },

    itemUpdate: function(itemID, updates) {
        // console.log("itemUpdate", itemID, updates);
        dispatcher.dispatch({
            type: "UPDATE_ITEM",
            itemID: itemID,
            updates: updates
        });

        // API action call
        ApiUtils.itemUpdate(
            itemID,
            updates
        );
    },

}

export default ItemActions;
