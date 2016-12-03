import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ListActions = {

    setCurrentList: function(listID) {
        dispatcher.dispatch({
            type: "SET_CURRENT_LIST",
            listID: listID
        })
    },

    listCreate: function(title) {
        var listID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        // Add data to local store
        dispatcher.dispatch({
            type: "CREATE_LIST",
            title: title,
            listID: listID
        });

        // API action call
        WebAPIUtils.listCreate(listID, title);
    },

    listDelete: function(listID, mongoID) {
        dispatcher.dispatch({
            type: "DELETE_LIST",
            listID: listID
        });

        if (mongoID) {
            WebAPIUtils.listDelete(mongoID);
        }
    },

    listUpdate: function(listID, mongoID, updates) {
        // console.log("listUpdate");
        dispatcher.dispatch({
            type: "UPDATE_ITEM",
            itemID: itemID,
            updates: updates
        });

        // API action call
        // WebAPIUtils.itemUpdate(
        //     itemID,
        //     updates
        // );
    },

    listUpdateTitle: function(listID, title) {
        dispatcher.dispatch({
            type: "UPDATE_LIST_TITLE",
            listID: listID,
            title: title
        });

        // API action call
        // WebAPIUtils.listUpdate(
        //     listID,
        //     {
        //         title: title
        //     }
        // );
    },

    resetListView: function() {
        dispatcher.dispatch({
            type: "RESET_LIST_VIEW"
        });
    }
}

export default ListActions;
