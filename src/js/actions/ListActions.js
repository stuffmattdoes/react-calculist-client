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

    listDelete: function(listID) {
        dispatcher.dispatch({
            type: "DELETE_LIST",
            listID: listID
        });

        WebAPIUtils.listDelete(listID);
    },

    listUpdate: function(listID, updates) {
        console.log("listUpdate");
        dispatcher.dispatch({
            type: "UPDATE_LIST",
            listID: listID,
            updates: updates
        });

        // API action call
        WebAPIUtils.listUpdate(
            listID,
            updates
        );
    },

    resetListView: function() {
        dispatcher.dispatch({
            type: "RESET_LIST_VIEW"
        });
    }
}

export default ListActions;
